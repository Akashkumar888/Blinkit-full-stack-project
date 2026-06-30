import React, {
  useCallback,
} from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import banner from "../assets/banner.jpg";
import bannerMobile from "../assets/banner-mobile.jpg";

import { valideURLConvert } from "../utils/valideURLConvert";

import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";

const Home = () => {
  const navigate = useNavigate();

  const loadingCategory = useSelector(
    (state) => state.product.loadingCategory
  );

  const categoryData = useSelector(
    (state) => state.product.allCategory
  );

  const subCategoryData = useSelector(
    (state) => state.product.allSubCategory
  );

  const handleRedirectProductListPage =
    useCallback(
      (categoryId, categoryName) => {
        const subCategory =
          subCategoryData.find((sub) =>
            sub.category.some(
              (category) =>
                category._id === categoryId
            )
          );

        if (!subCategory) return;

        const url = `/${valideURLConvert(
          categoryName
        )}-${categoryId}/${valideURLConvert(
          subCategory.name
        )}-${subCategory._id}`;

        navigate(url);
      },
      [navigate, subCategoryData]
    );

  return (
    <section className="bg-white">

      {/* Banner */}

      <div className="container mx-auto">

        <div
          className="
            w-full
            overflow-hidden
            rounded
            bg-blue-100
          "
        >
          <img
            src={banner}
            alt="Banner"
            loading="eager"
            className="hidden w-full lg:block"
          />

          <img
            src={bannerMobile}
            alt="Banner"
            loading="eager"
            className="w-full lg:hidden"
          />
        </div>

      </div>

      {/* Categories */}

      <div
        className="
          container
          mx-auto
          my-4
          grid
          grid-cols-5
          gap-3
          px-4
          md:grid-cols-8
          lg:grid-cols-10
        "
      >
        {loadingCategory
          ? Array.from({
              length: 10,
            }).map((_, index) => (
              <div
                key={index}
                className="
                  animate-pulse
                  rounded
                  bg-white
                  p-3
                  shadow
                "
              >
                <div className="h-24 rounded bg-blue-100" />

                <div className="mt-3 h-6 rounded bg-blue-100" />
              </div>
            ))
          : categoryData.map(
              (category) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() =>
                    handleRedirectProductListPage(
                      category._id,
                      category.name
                    )
                  }
                  className="
                    rounded
                    transition-transform
                    hover:scale-105
                  "
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="
                      h-full
                      w-full
                      object-scale-down
                    "
                  />
                </button>
              )
            )}
      </div>

      {/* Category Wise Products */}

      <div className="space-y-5">

        {categoryData.map((category) => (
          <CategoryWiseProductDisplay
            key={category._id}
            id={category._id}
            name={category.name}
          />
        ))}

      </div>

    </section>
  );
};

export default Home;