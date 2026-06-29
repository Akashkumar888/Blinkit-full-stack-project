
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import uploadImage from "../utils/UploadImage";

const EditSubCategory = ({
  close,
  data,
  fetchData,
}) => {
  const allCategory = useSelector(
    (state) => state.product.allCategory
  );

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    _id: data?._id || "",
    name: data?.name || "",
    image: data?.image || "",
    category: data?.category || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image.");
      return;
    }

    try {
      setLoading(true);

      const response = await uploadImage(file);

      setFormData((prev) => ({
        ...prev,
        image: response.data.data.url,
      }));

      toast.success("Image uploaded");
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCategory = (categoryId) => {
    setFormData((prev) => ({
      ...prev,
      category: prev.category.filter(
        (item) => item._id !== categoryId
      ),
    }));
  };

  const handleSelectCategory = (e) => {
    const value = e.target.value;

    if (!value) return;

    const category = allCategory.find(
      (item) => item._id === value
    );

    if (!category) return;

    const alreadyExists =
      formData.category.some(
        (item) => item._id === value
      );

    if (alreadyExists) {
      toast.error("Category already selected");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      category: [...prev.category, category],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter subcategory name");
      return;
    }

    if (!formData.image) {
      toast.error("Please upload image");
      return;
    }

    if (!formData.category.length) {
      toast.error("Select at least one category");
      return;
    }

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.updateSubCategory,
        data: formData,
      });

      const responseData = response.data;

      if (responseData.success) {
        toast.success(responseData.message);

        fetchData?.();

        close?.();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/70
      p-4
    "
    >
      <div
        className="
        w-full
        max-w-4xl
        rounded-lg
        bg-white
        p-5
        shadow-xl
      "
      >
        {/* Header */}

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Edit Sub Category
          </h2>

          <button
            type="button"
            onClick={close}
            className="hover:text-red-500"
          >
            <IoClose size={25} />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-5 grid gap-5"
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
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter sub category"
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

          {/* Image */}

          <div className="grid gap-2">
            <p className="font-medium">
              Image
            </p>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div
                className="
                  flex
                  h-36
                  w-full
                  items-center
                  justify-center
                  rounded
                  border
                  bg-blue-50
                  lg:w-36
                "
              >
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="subcategory"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <p className="text-sm text-gray-400">
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
                    transition
                    hover:bg-primary-200
                  "
                >
                  {loading
                    ? "Uploading..."
                    : "Upload Image"}
                </div>

                <input
                  id="uploadImage"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleUploadImage}
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
                p-2
              "
            >
              <div className="mb-2 flex flex-wrap gap-2">
                {formData.category.map((item) => (
                  <div
                    key={item._id}
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
                    <span>{item.name}</span>

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveCategory(item._id)
                      }
                      className="hover:text-red-500"
                    >
                      <IoClose size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <select
                className="
                  w-full
                  rounded
                  border
                  bg-transparent
                  p-2
                  outline-none
                "
                defaultValue=""
                onChange={handleSelectCategory}
              >
                <option value="">
                  Select Category
                </option>

                {allCategory.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={
              loading ||
              !formData.name ||
              !formData.image ||
              !formData.category.length
            }
            className={`
              rounded
              py-2
              font-semibold
              transition

              ${
                loading ||
                !formData.name ||
                !formData.image ||
                !formData.category.length
                  ? "cursor-not-allowed bg-gray-300"
                  : "bg-primary-200 hover:bg-primary-100"
              }
            `}
          >
            {loading
              ? "Updating..."
              : "Update Sub Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditSubCategory;