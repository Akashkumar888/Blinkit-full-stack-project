
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import { IoSearchOutline } from "react-icons/io5";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

import Loading from "../components/Loading";
import ProductCardAdmin from "../components/ProductCardAdmin";
import NoData from "../components/NoData";

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);

  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");

  const fetchProductData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page,
          limit: 12,
          search: debounceSearch,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setProducts(responseData.data);
        setTotalPageCount(responseData.totalNoPage || 1);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  }, [page, debounceSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search.trim());
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPageCount) {
      setPage((prev) => prev + 1);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <section>
      {/* Header */}
      <div className="bg-white shadow-md p-3 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">
          Products
        </h2>

        <div className="flex items-center gap-3 bg-blue-50 border rounded px-4 py-2 w-full max-w-xs focus-within:border-primary-200">
          <IoSearchOutline size={22} />

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={handleSearch}
            className="w-full bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Body */}
      <div className="bg-blue-50 p-4 min-h-[80vh]">

        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <NoData />
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {products.map((product) => (
                <ProductCardAdmin
                  key={product._id}
                  data={product}
                  fetchProductData={fetchProductData}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between gap-3 mt-8">

              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className={`
                  border px-4 py-2 rounded transition
                  ${
                    page === 1
                      ? "cursor-not-allowed bg-gray-200 text-gray-500"
                      : "border-primary-200 hover:bg-primary-200"
                  }
                `}
              >
                Previous
              </button>

              <div className="flex-1 bg-white border rounded py-2 text-center font-medium">
                Page {page} of {totalPageCount}
              </div>

              <button
                onClick={handleNext}
                disabled={page === totalPageCount}
                className={`
                  border px-4 py-2 rounded transition
                  ${
                    page === totalPageCount
                      ? "cursor-not-allowed bg-gray-200 text-gray-500"
                      : "border-primary-200 hover:bg-primary-200"
                  }
                `}
              >
                Next
              </button>

            </div>
          </>
        )}

      </div>
    </section>
  );
};

export default ProductAdmin;