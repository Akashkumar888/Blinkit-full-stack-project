
import React, {
  useCallback,
  useState,
} from "react";

import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import uploadImage from "../utils/UploadImage";
import AxiosToastError from "../utils/AxiosToastError";

const initialState = {
  name: "",
  image: "",
};

const UploadCategoryModel = ({
  close,
  fetchData,
}) => {
  const [data, setData] = useState(initialState);

  const [loading, setLoading] =
    useState(false);

  const [imageLoading, setImageLoading] =
    useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleUploadCategoryImage =
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

        setData((prev) => ({
          ...prev,
          image: imageUrl,
        }));
      } catch (error) {
        AxiosToastError(error);
      } finally {
        setImageLoading(false);
      }
    }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!data.name.trim()) {
        toast.error(
          "Category name is required."
        );
        return;
      }

      if (!data.image) {
        toast.error(
          "Please upload an image."
        );
        return;
      }

      try {
        setLoading(true);

        const response = await Axios({
          ...SummaryApi.addCategory,
          data,
        });

        const responseData =
          response?.data;

        if (!responseData?.success) {
          toast.error(
            responseData?.message ||
              "Failed to create category."
          );
          return;
        }

        toast.success(
          responseData.message
        );

        setData(initialState);

        fetchData?.();

        close?.();
      } catch (error) {
        AxiosToastError(error);
      } finally {
        setLoading(false);
      }
    },
    [data, fetchData, close]
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
        bg-neutral-900/60
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-3xl
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
            Add Category
          </h2>

          <button
            type="button"
            disabled={loading}
            onClick={close}
            aria-label="Close"
            className="
              rounded
              p-1
              transition
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
          <div className="grid gap-1">
            <label
              htmlFor="categoryName"
              className="font-medium"
            >
              Category Name
            </label>

            <input
              id="categoryName"
              name="name"
              type="text"
              required
              value={data.name}
              onChange={handleChange}
              placeholder="Enter category name"
              className="
                rounded
                border
                bg-blue-50
                p-2
                outline-none
                focus:border-primary-200
              "
            />
          </div>

          <div className="grid gap-2">
            <label className="font-medium">
              Category Image
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
                {data.image ? (
                  <img
                    src={data.image}
                    alt="Category"
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

              <label
                htmlFor="uploadCategoryImage"
              >
                <div
                  className={`
                    rounded
                    border
                    px-5
                    py-2
                    font-medium
                    transition

                    ${
                      !data.name
                        ? "cursor-not-allowed bg-gray-300"
                        : "cursor-pointer border-primary-200 hover:bg-primary-100"
                    }
                  `}
                >
                  {imageLoading
                    ? "Uploading..."
                    : "Upload Image"}
                </div>

                <input
                  id="uploadCategoryImage"
                  type="file"
                  hidden
                  accept="image/*"
                  disabled={
                    !data.name ||
                    imageLoading
                  }
                  onChange={
                    handleUploadCategoryImage
                  }
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={
              loading ||
              imageLoading ||
              !data.name ||
              !data.image
            }
            className={`
              rounded
              py-2
              font-semibold
              transition

              ${
                data.name &&
                data.image &&
                !loading
                  ? "bg-primary-200 hover:bg-primary-100"
                  : "cursor-not-allowed bg-gray-300"
              }
            `}
          >
            {loading
              ? "Adding Category..."
              : "Add Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;