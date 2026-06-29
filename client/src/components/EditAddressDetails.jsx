
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useGlobalContext } from "../provider/GlobalProvider";

const EditAddressDetails = ({
  close,
  data: addressData,
}) => {
  const { fetchAddress } = useGlobalContext();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      _id: addressData?._id || "",
      userId: addressData?.userId || "",
      address_line: addressData?.address_line || "",
      city: addressData?.city || "",
      state: addressData?.state || "",
      country: addressData?.country || "",
      pincode: addressData?.pincode || "",
      mobile: addressData?.mobile || "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.updateAddress,
        data: formData,
      });

      const responseData = response.data;

      if (responseData.success) {
        toast.success(responseData.message);

        await fetchAddress();

        reset();

        close?.();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  if (!addressData) return null;

  return (
    <section
      className="
        fixed
        inset-0
        z-50
        bg-black/60
        overflow-y-auto
      "
    >
      <div
        className="
          mx-auto
          mt-8
          w-full
          max-w-lg
          rounded-lg
          bg-white
          p-5
          shadow-xl
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Edit Address
          </h2>

          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="
              rounded
              p-1
              transition
              hover:bg-gray-100
              hover:text-red-500
            "
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 space-y-4"
        >
          {/* Address */}

          <div>
            <label className="font-medium">
              Address Line
            </label>

            <input
              type="text"
              className="
                mt-1
                w-full
                rounded
                border
                bg-blue-50
                p-2
                outline-none
                focus:border-green-600
              "
              {...register("address_line", {
                required: "Address is required",
              })}
            />

            {errors.address_line && (
              <p className="mt-1 text-sm text-red-500">
                {errors.address_line.message}
              </p>
            )}
          </div>

          {/* City */}

          <div>
            <label className="font-medium">
              City
            </label>

            <input
              type="text"
              className="mt-1 w-full rounded border bg-blue-50 p-2 outline-none focus:border-green-600"
              {...register("city", {
                required: "City is required",
              })}
            />
          </div>

          {/* State */}

          <div>
            <label className="font-medium">
              State
            </label>

            <input
              type="text"
              className="mt-1 w-full rounded border bg-blue-50 p-2 outline-none focus:border-green-600"
              {...register("state", {
                required: "State is required",
              })}
            />
          </div>

          {/* Country */}

          <div>
            <label className="font-medium">
              Country
            </label>

            <input
              type="text"
              className="mt-1 w-full rounded border bg-blue-50 p-2 outline-none focus:border-green-600"
              {...register("country", {
                required: "Country is required",
              })}
            />
          </div>

          {/* Pincode */}

          <div>
            <label className="font-medium">
              Pincode
            </label>

            <input
              type="text"
              className="mt-1 w-full rounded border bg-blue-50 p-2 outline-none focus:border-green-600"
              {...register("pincode", {
                required: "Pincode is required",
              })}
            />
          </div>

          {/* Mobile */}

          <div>
            <label className="font-medium">
              Mobile Number
            </label>

            <input
              type="text"
              className="mt-1 w-full rounded border bg-blue-50 p-2 outline-none focus:border-green-600"
              {...register("mobile", {
                required: "Mobile number is required",
              })}
            />
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className={`
              mt-4
              w-full
              rounded
              py-2
              font-semibold
              text-white
              transition

              ${
                loading
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-green-600 hover:bg-green-700"
              }
            `}
          >
            {loading
              ? "Updating..."
              : "Update Address"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditAddressDetails;