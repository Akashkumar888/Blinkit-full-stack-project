
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { valideURLConvert } from "../utils/valideURLConvert";

import Loading from "../components/Loading";
import CardProduct from "../components/CardProduct";
import NoData from "../components/NoData";

const ProductListPage = () => {
  const { category, subCategory } = useParams();

  const allSubCategory = useSelector(
    (state) => state.product.allSubCategory
  );

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const categoryId = useMemo(
    () => category.split("-").slice(-1)[0],
    [category]
  );

  const subCategoryId = useMemo(
    () => subCategory.split("-").slice(-1)[0],
    [subCategory]
  );

  const subCategoryName = useMemo(() => {
    return subCategory
      .split("-")
      .slice(0, -1)
      .join(" ");
  }, [subCategory]);

  const displaySubCategory = useMemo(() => {
    return allSubCategory.filter((sub) =>
      sub.category.some((cat) => cat._id === categoryId)
    );
  }, [allSubCategory, categoryId]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId,
          subCategoryId,
          page,
          limit: 8,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (page === 1) {
          setProducts(responseData.data);
        } else {
          setProducts((prev) => [
            ...prev,
            ...responseData.data,
          ]);
        }

        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  }, [categoryId, subCategoryId, page]);

  useEffect(() => {
    setPage(1);
    setProducts([]);
  }, [categoryId, subCategoryId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">

        {/* Left Sidebar */}

        <aside className="bg-white shadow-md py-2 min-h-[88vh] max-h-[88vh] overflow-y-auto scrollbarCustom">

          {displaySubCategory.map((sub) => {
            const link = `/${valideURLConvert(
              sub.category[0]?.name
            )}-${sub.category[0]?._id}/${valideURLConvert(
              sub.name
            )}-${sub._id}`;

            return (
              <Link
                key={sub._id}
                to={link}
                className={`
                  border-b
                  p-2
                  lg:flex
                  lg:items-center
                  lg:gap-4
                  hover:bg-green-100
                  transition
                  ${
                    sub._id === subCategoryId
                      ? "bg-green-100"
                      : ""
                  }
                `}
              >
                <div className="bg-white rounded w-fit mx-auto lg:mx-0">
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="w-14 h-14 object-scale-down"
                  />
                </div>

                <p className="text-xs lg:text-base text-center lg:text-left mt-1 lg:mt-0">
                  {sub.name}
                </p>
              </Link>
            );
          })}
        </aside>

        {/* Products */}

        <main>

          <div className="bg-white shadow-md p-4 sticky top-20 z-10">
            <h2 className="font-semibold text-lg">
              {subCategoryName}
            </h2>
          </div>

          <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto bg-slate-50">

            {loading && page === 1 ? (
              <Loading />
            ) : products.length === 0 ? (
              <NoData />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                  {products.map((product) => (
                    <CardProduct
                      key={product._id}
                      data={product}
                    />
                  ))}
                </div>

                {page < totalPage && (
                  <div className="flex justify-center pb-6">
                    <button
                      onClick={() =>
                        setPage((prev) => prev + 1)
                      }
                      disabled={loading}
                      className="px-6 py-2 rounded bg-primary-200 hover:bg-primary-100 font-medium disabled:bg-gray-300"
                    >
                      {loading ? "Loading..." : "Load More"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

        </main>
      </div>
    </section>
  );
};

export default ProductListPage;