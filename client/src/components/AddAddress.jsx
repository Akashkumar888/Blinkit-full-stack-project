
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useGlobalContext } from "../provider/GlobalProvider";

const AddAddress = ({ close }) => {
  const { fetchAddress } = useGlobalContext();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      addressLine: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      mobile: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.createAddress,
        data: {
          address_line: formData.addressLine.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          country: formData.country.trim(),
          pincode: formData.pincode.trim(),
          mobile: formData.mobile.trim(),
        },
      });

      const responseData = response.data;

      if (responseData.success) {
        toast.success(responseData.message);

        reset();

        await fetchAddress();

        close?.();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 z-50 bg-black/70 overflow-y-auto">

      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto mt-8 p-6">

        {/* Header */}

        <div className="flex items-center justify-between">

          <h2 className="text-lg font-semibold">
            Add Address
          </h2>

          <button
            type="button"
            onClick={close}
            className="hover:text-red-500 transition"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 mt-5"
        >

          {/* Address */}

          <div className="grid gap-1">

            <label htmlFor="addressLine">
              Address Line
            </label>

            <input
              id="addressLine"
              type="text"
              className="border rounded bg-blue-50 p-2 outline-none focus:border-green-600"
              placeholder="Enter address"
              {...register("addressLine", {
                required: "Address is required",
              })}
            />

            {errors.addressLine && (
              <p className="text-red-500 text-sm">
                {errors.addressLine.message}
              </p>
            )}

          </div>

          {/* City */}

          <div className="grid gap-1">

            <label htmlFor="city">
              City
            </label>

            <input
              id="city"
              type="text"
              className="border rounded bg-blue-50 p-2 outline-none focus:border-green-600"
              placeholder="Enter city"
              {...register("city", {
                required: "City is required",
              })}
            />

            {errors.city && (
              <p className="text-red-500 text-sm">
                {errors.city.message}
              </p>
            )}

          </div>

          {/* State */}

          <div className="grid gap-1">

            <label htmlFor="state">
              State
            </label>

            <input
              id="state"
              type="text"
              className="border rounded bg-blue-50 p-2 outline-none focus:border-green-600"
              placeholder="Enter state"
              {...register("state", {
                required: "State is required",
              })}
            />

            {errors.state && (
              <p className="text-red-500 text-sm">
                {errors.state.message}
              </p>
            )}

          </div>

          {/* Pincode */}

          <div className="grid gap-1">

            <label htmlFor="pincode">
              Pincode
            </label>

            <input
              id="pincode"
              type="text"
              maxLength={6}
              className="border rounded bg-blue-50 p-2 outline-none focus:border-green-600"
              placeholder="Enter pincode"
              {...register("pincode", {
                required: "Pincode is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Enter valid pincode",
                },
              })}
            />

            {errors.pincode && (
              <p className="text-red-500 text-sm">
                {errors.pincode.message}
              </p>
            )}

          </div>

          {/* Country */}

          <div className="grid gap-1">

            <label htmlFor="country">
              Country
            </label>

            <input
              id="country"
              type="text"
              className="border rounded bg-blue-50 p-2 outline-none focus:border-green-600"
              placeholder="Enter country"
              {...register("country", {
                required: "Country is required",
              })}
            />

            {errors.country && (
              <p className="text-red-500 text-sm">
                {errors.country.message}
              </p>
            )}

          </div>

          {/* Mobile */}

          <div className="grid gap-1">

            <label htmlFor="mobile">
              Mobile Number
            </label>

            <input
              id="mobile"
              type="text"
              maxLength={10}
              className="border rounded bg-blue-50 p-2 outline-none focus:border-green-600"
              placeholder="Enter mobile number"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter valid mobile number",
                },
              })}
            />

            {errors.mobile && (
              <p className="text-red-500 text-sm">
                {errors.mobile.message}
              </p>
            )}

          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-600"
            }`}
          >
            {loading ? "Saving..." : "Save Address"}
          </button>

        </form>

      </div>
    </section>
  );
};

export default AddAddress;