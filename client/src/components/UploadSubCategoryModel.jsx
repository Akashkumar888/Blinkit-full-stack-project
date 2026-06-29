

import React, {
  useCallback,
  useState,
} from "react";

import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import uploadImage from "../utils/UploadImage";
import AxiosToastError from "../utils/AxiosToastError";

const initialState = {
  name: "",
  image: "",
  category: [],
};

const UploadSubCategoryModel = ({
  close,
  fetchData,
}) => {
  const allCategory = useSelector(
    (state) => state.product.allCategory
  );

  const [subCategoryData, setSubCategoryData] =
    useState(initialState);

  const [loading, setLoading] =
    useState(false);

  const [imageLoading, setImageLoading] =
    useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setSubCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleUploadSubCategoryImage =
    useCallback(async (e) => {
      const file = e.target.files?.[0];

      if (!file) return;

      try {
        setImageLoading(true);

        const response =
          await uploadImage(file);

        const imageUrl =
          response?.data?.data?.url;

        if (!imageUrl) {
          toast.error(
            "Image upload failed."
          );
          return;
        }

        setSubCategoryData((prev) => ({
          ...prev,
          image: imageUrl,
        }));
      } catch (error) {
        AxiosToastError(error);
      } finally {
        setImageLoading(false);
      }
    }, []);

  const handleAddCategory = (id) => {
    if (!id) return;

    const category =
      allCategory.find(
        (item) => item._id === id
      );

    if (!category) return;

    const alreadyExists =
      subCategoryData.category.some(
        (item) => item._id === id
      );

    if (alreadyExists) {
      toast.error(
        "Category already selected."
      );
      return;
    }

    setSubCategoryData((prev) => ({
      ...prev,
      category: [
        ...prev.category,
        category,
      ],
    }));
  };

  const handleRemoveCategory =
    useCallback((id) => {
      setSubCategoryData((prev) => ({
        ...prev,
        category:
          prev.category.filter(
            (item) => item._id !== id
          ),
      }));
    }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (
        !subCategoryData.name.trim()
      ) {
        toast.error(
          "Sub category name is required."
        );
        return;
      }

      if (!subCategoryData.image) {
        toast.error(
          "Please upload an image."
        );
        return;
      }

      if (
        subCategoryData.category.length ===
        0
      ) {
        toast.error(
          "Please select at least one category."
        );
        return;
      }

      try {
        setLoading(true);

        const response =
          await Axios({
            ...SummaryApi.createSubCategory,
            data: subCategoryData,
          });

        const responseData =
          response?.data;

        if (!responseData?.success) {
          toast.error(
            responseData?.message ||
              "Unable to create sub category."
          );
          return;
        }

        toast.success(
          responseData.message
        );

        setSubCategoryData(
          initialState
        );

        fetchData?.();

        close?.();
      } catch (error) {
        AxiosToastError(error);
      } finally {
        setLoading(false);
      }
    },
    [
      subCategoryData,
      fetchData,
      close,
    ]
  );

  return (
    <section
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-neutral-900/70
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-5xl
          rounded-lg
          bg-white
          p-5
          shadow-xl
        "
      >
        {/* Header */}

        <div
          className="
            mb-5
            flex
            items-center
            justify-between
          "
        >
          <h2 className="text-lg font-semibold">
            Add Sub Category
          </h2>

          <button
            type="button"
            onClick={close}
            disabled={loading}
            className="
              rounded
              p-1
              hover:bg-gray-100
            "
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="grid gap-5"
        >
          {/* Name */}

          <div className="grid gap-1">
            <label
              htmlFor="name"
              className="font-medium"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              value={
                subCategoryData.name
              }
              onChange={handleChange}
              placeholder="Enter sub category name"
              className="
                rounded
                border
                bg-blue-50
                p-3
                outline-none
                focus:border-primary-200
              "
            />
          </div>

          {/* Image */}

          <div className="grid gap-2">
            <label className="font-medium">
              Image
            </label>

            <div
              className="
                flex
                flex-col
                gap-4
                lg:flex-row
                lg:items-center
              "
            >
              <div
                className="
                  flex
                  h-40
                  w-full
                  items-center
                  justify-center
                  rounded
                  border
                  bg-blue-50
                  lg:w-40
                "
              >
                {subCategoryData.image ? (
                  <img
                    src={
                      subCategoryData.image
                    }
                    alt="Sub Category"
                    className="
                      h-full
                      w-full
                      object-contain
                    "
                  />
                ) : (
                  <p className="text-sm text-gray-500">
                    No Image
                  </p>
                )}
              </div>

              <label htmlFor="uploadImage">
                <div
                  className="
                    cursor-pointer
                    rounded
                    border
                    border-primary-200
                    px-5
                    py-2
                    font-medium
                    hover:bg-primary-100
                  "
                >
                  {imageLoading
                    ? "Uploading..."
                    : "Upload Image"}
                </div>

                <input
                  id="uploadImage"
                  hidden
                  type="file"
                  accept="image/*"
                  disabled={
                    imageLoading
                  }
                  onChange={
                    handleUploadSubCategoryImage
                  }
                />
              </label>
            </div>
          </div>

          {/* Categories */}

          <div className="grid gap-2">
            <label className="font-medium">
              Categories
            </label>

            <div
              className="
                rounded
                border
              "
            >
              <div className="flex flex-wrap gap-2 p-2">
                {subCategoryData.category.map(
                  (category) => (
                    <div
                      key={category._id}
                      className="
                        flex
                        items-center
                        gap-2
                        rounded
                        bg-blue-50
                        px-2
                        py-1
                      "
                    >
                      <span>
                        {category.name}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveCategory(
                            category._id
                          )
                        }
                        className="
                          text-red-500
                          hover:text-red-700
                        "
                      >
                        <IoClose
                          size={18}
                        />
                      </button>
                    </div>
                  )
                )}
              </div>

              <select
                defaultValue=""
                onChange={(e) => {
                  handleAddCategory(
                    e.target.value
                  );
                  e.target.value = "";
                }}
                className="
                  w-full
                  border-t
                  bg-transparent
                  p-2
                  outline-none
                "
              >
                <option value="">
                  Select Category
                </option>

                {allCategory.map(
                  (category) => (
                    <option
                      key={
                        category._id
                      }
                      value={
                        category._id
                      }
                    >
                      {category.name}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={
              loading ||
              imageLoading ||
              !subCategoryData.name ||
              !subCategoryData.image ||
              subCategoryData
                .category.length === 0
            }
            className={`
              rounded
              py-2
              font-semibold
              transition

              ${
                subCategoryData.name &&
                subCategoryData.image &&
                subCategoryData
                  .category.length > 0 &&
                !loading
                  ? "bg-primary-200 hover:bg-primary-100"
                  : "cursor-not-allowed bg-gray-300"
              }
            `}
          >
            {loading
              ? "Creating..."
              : "Create Sub Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;