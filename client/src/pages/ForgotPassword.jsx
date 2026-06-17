import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validValue = Object.values(data).every(
    (value) => value.trim() !== ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validValue) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.forgot_password,
        data: {
          email: data.email.trim(),
        },
      });

      const responseData = response?.data;

      if (responseData?.error) {
        toast.error(responseData.message);
        return;
      }

      if (responseData?.success) {
        toast.success(responseData.message);

        navigate("/verification-otp", {
          state: {
            email: data.email.trim(),
          },
        });

        setData({
          email: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7 shadow-sm">

        <h1 className="font-semibold text-xl mb-2">
          Forgot Password
        </h1>

        <p className="text-gray-500 text-sm mb-4">
          Enter your registered email address. We'll send
          you an OTP to reset your password.
        </p>

        <form
          className="grid gap-4"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-1">
            <label
              htmlFor="email"
              className="font-medium"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="
                bg-blue-50
                p-2
                border
                rounded
                outline-none
                focus:border-[#ffbf00]
              "
            />
          </div>

          <button
            type="submit"
            disabled={!validValue || loading}
            className={`
              text-white
              py-2
              rounded
              font-semibold
              tracking-wide
              transition-all
              ${
                validValue && !loading
                  ? "bg-green-800 hover:bg-green-700"
                  : "bg-gray-500 cursor-not-allowed"
              }
            `}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        <p className="mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              font-semibold
              text-green-700
              hover:text-green-800
            "
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;