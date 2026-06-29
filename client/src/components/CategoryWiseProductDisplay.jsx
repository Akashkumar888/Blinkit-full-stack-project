
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";

import { valideURLConvert } from "../utils/valideURLConvert";

const CategoryWiseProductDisplay = ({ id, name }) => {
  const containerRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const subCategories = useSelector(
    (state) => state.product.allSubCategory
  );

  const loadingCards = useMemo(
    () => Array.from({ length: 6 }),
    []
  );

  /*
  ------------------------------------
  Fetch Products
  ------------------------------------
  */

  const fetchCategoryProducts = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
          id,
        },
      });

      const responseData = response.data;

      if (responseData.success) {
        setProducts(responseData.data || []);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCategoryProducts();
  }, [fetchCategoryProducts]);

  /*
  ------------------------------------
  Scroll
  ------------------------------------
  */

  const handleScrollLeft = () => {
    if (!containerRef.current) return;

    containerRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    if (!containerRef.current) return;

    containerRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  /*
  ------------------------------------
  Redirect URL
  ------------------------------------
  */

  const redirectURL = useMemo(() => {
    const subCategory = subCategories.find((sub) =>
      sub.category.some(
        (category) => category._id === id
      )
    );

    if (!subCategory) return "/";

    return `/${valideURLConvert(name)}-${id}/${valideURLConvert(
      subCategory.name
    )}-${subCategory._id}`;
  }, [id, name, subCategories]);

  return (
    <section className="py-4">

      {/* Heading */}

      <div className="container mx-auto flex items-center justify-between px-4">

        <h2 className="text-lg font-semibold md:text-xl">
          {name}
        </h2>

        <Link
          to={redirectURL}
          className="
            text-green-600
            font-medium
            hover:text-green-700
            transition-colors
          "
        >
          See All
        </Link>

      </div>

      {/* Products */}

      <div className="relative mt-4">

        <div
          ref={containerRef}
          className="
            container
            mx-auto
            flex
            gap-4
            overflow-x-auto
            scroll-smooth
            scrollbar-none
            px-4
            md:gap-6
            lg:gap-8
          "
        >
          {loading &&
            loadingCards.map((_, index) => (
              <CardLoading
                key={`loading-${index}`}
              />
            ))}

          {!loading &&
            products.map((product) => (
              <CardProduct
                key={product._id}
                data={product}
              />
            ))}
        </div>

        {/* Scroll Buttons */}

        <div
          className="
            absolute
            inset-y-0
            left-0
            right-0
            hidden
            items-center
            justify-between
            px-2
            lg:flex
            pointer-events-none
          "
        >
          <button
            onClick={handleScrollLeft}
            aria-label="Scroll Left"
            className="
              pointer-events-auto
              rounded-full
              bg-white
              p-3
              shadow-lg
              transition
              hover:bg-gray-100
            "
          >
            <FaAngleLeft />
          </button>

          <button
            onClick={handleScrollRight}
            aria-label="Scroll Right"
            className="
              pointer-events-auto
              rounded-full
              bg-white
              p-3
              shadow-lg
              transition
              hover:bg-gray-100
            "
          >
            <FaAngleRight />
          </button>

        </div>

      </div>

    </section>
  );
};

export default CategoryWiseProductDisplay;