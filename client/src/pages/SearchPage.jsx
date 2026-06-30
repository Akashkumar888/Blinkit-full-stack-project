import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

import CardLoading from "../components/CardLoading";
import CardProduct from "../components/CardProduct";

import noDataImage from "../assets/nothing here yet.webp";

const SearchPage = () => {
  const location = useLocation();

  const searchText =
    new URLSearchParams(location.search).get("q") || "";

  const loadingCards = new Array(10).fill(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    setProducts([]);
    setPage(1);
  }, [searchText]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setTotalPage(responseData.totalPage);

        if (page === 1) {
          setProducts(responseData.data);
        } else {
          setProducts((prev) => [
            ...prev,
            ...responseData.data,
          ]);
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  }, [page, searchText]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const fetchMoreProducts = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="bg-white min-h-screen">
      <div className="container mx-auto p-4">

        <h2 className="font-semibold text-lg">
          Search Results ({products.length})
        </h2>

        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreProducts}
          hasMore={page < totalPage}
          loader={
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
              {loadingCards.map((_, index) => (
                <CardLoading
                  key={`loading-${index}`}
                />
              ))}
            </div>
          }
          endMessage={
            products.length > 0 && (
              <p className="text-center py-6 text-gray-500">
                No more products to load.
              </p>
            )
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-4">
            {products.map((product, index) => (
              <CardProduct
                key={`${product._id}-${index}`}
                data={product}
              />
            ))}

            {loading &&
              page === 1 &&
              loadingCards.map((_, index) => (
                <CardLoading
                  key={`initial-loading-${index}`}
                />
              ))}
          </div>
        </InfiniteScroll>

        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10">

            <img
              src={noDataImage}
              alt="No Products"
              className="w-full max-w-xs object-contain"
            />

            <p className="mt-3 text-lg font-semibold text-neutral-600">
              No products found
            </p>

            <p className="text-sm text-neutral-400">
              Try searching with a different keyword.
            </p>

          </div>
        )}

      </div>
    </section>
  );
};

export default SearchPage;