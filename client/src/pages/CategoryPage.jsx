
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

import toast from "react-hot-toast";

import Loading from "../components/Loading";
import NoData from "../components/NoData";
import CofirmBox from "../components/CofirmBox";
import EditCategory from "../components/EditCategory";
import UploadCategoryModel from "../components/UploadCategoryModel";

const CategoryPage = () => {
  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [isUploadOpen, setIsUploadOpen] =
    useState(false);

  const [isEditOpen, setIsEditOpen] =
    useState(false);

  const [isDeleteOpen, setIsDeleteOpen] =
    useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const fetchCategory =
    useCallback(async () => {
      try {
        setLoading(true);

        const response = await Axios({
          ...SummaryApi.getCategory,
        });

        const {
          data: responseData,
        } = response;

        if (responseData.success) {
          setCategories(
            responseData.data
          );
        }
      } catch (error) {
        AxiosToastError(error);
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const openEditModal =
    useCallback((category) => {
      setSelectedCategory(category);
      setIsEditOpen(true);
    }, []);

  const openDeleteModal =
    useCallback((category) => {
      setSelectedCategory(category);
      setIsDeleteOpen(true);
    }, []);

  const handleDeleteCategory =
    useCallback(async () => {
      if (!selectedCategory?._id) return;

      try {
        const response = await Axios({
          ...SummaryApi.deleteCategory,
          data: {
            _id: selectedCategory._id,
          },
        });

        const {
          data: responseData,
        } = response;

        if (responseData.success) {
          toast.success(
            responseData.message
          );

          setIsDeleteOpen(false);

          fetchCategory();
        }
      } catch (error) {
        AxiosToastError(error);
      }
    }, [
      selectedCategory,
      fetchCategory,
    ]);

  return (
    <section className="space-y-6">

      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          rounded-lg
          bg-white
          p-4
          shadow-sm
        "
      >
        <h2 className="text-xl font-semibold">
          Categories
        </h2>

        <button
          type="button"
          onClick={() =>
            setIsUploadOpen(true)
          }
          className="
            rounded-lg
            border
            border-primary-200
            px-4
            py-2
            text-sm
            font-medium
            transition
            hover:bg-primary-200
          "
        >
          Add Category
        </button>
      </div>

      {/* Loading */}

      {loading && <Loading />}

      {/* Empty */}

      {!loading &&
        categories.length === 0 && (
          <NoData />
        )}

      {/* Grid */}

      {!loading &&
        categories.length > 0 && (
          <div
            className="
              grid
              gap-5
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              xl:grid-cols-6
            "
          >
            {categories.map(
              (category) => (
                <div
                  key={category._id}
                  className="
                    overflow-hidden
                    rounded-lg
                    bg-white
                    shadow-sm
                    transition
                    hover:shadow-md
                  "
                >
                  <div className="aspect-square bg-gray-50">
                    <img
                      src={
                        category.image
                      }
                      alt={
                        category.name
                      }
                      loading="lazy"
                      className="
                        h-full
                        w-full
                        object-contain
                        p-3
                      "
                    />
                  </div>

                  <div className="space-y-3 p-3">

                    <h3
                      className="
                        line-clamp-2
                        text-center
                        font-medium
                      "
                    >
                      {category.name}
                    </h3>

                    <div className="grid grid-cols-2 gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(
                            category
                          )
                        }
                        className="
                          rounded
                          bg-green-100
                          py-2
                          text-sm
                          font-medium
                          text-green-700
                          transition
                          hover:bg-green-200
                        "
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openDeleteModal(
                            category
                          )
                        }
                        className="
                          rounded
                          bg-red-100
                          py-2
                          text-sm
                          font-medium
                          text-red-700
                          transition
                          hover:bg-red-200
                        "
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                </div>
              )
            )}
          </div>
        )}

      {/* Upload Modal */}

      {isUploadOpen && (
        <UploadCategoryModel
          close={() =>
            setIsUploadOpen(false)
          }
          fetchData={
            fetchCategory
          }
        />
      )}

      {/* Edit Modal */}

      {isEditOpen &&
        selectedCategory && (
          <EditCategory
            data={selectedCategory}
            close={() =>
              setIsEditOpen(false)
            }
            fetchData={
              fetchCategory
            }
          />
        )}

      {/* Delete Modal */}

      {isDeleteOpen && (
        <CofirmBox
          close={() =>
            setIsDeleteOpen(false)
          }
          cancel={() =>
            setIsDeleteOpen(false)
          }
          confirm={
            handleDeleteCategory
          }
        />
      )}
    </section>
  );
};

export default CategoryPage;