
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProductData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setProducts(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  return (
    <section className="p-4">
      <h1 className="mb-4 text-xl font-semibold">
        Products
      </h1>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div>
          {/* Product list will be rendered here */}
        </div>
      )}
    </section>
  );
};

export default Product;