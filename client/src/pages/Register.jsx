import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

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

    if (data.password !== data.confirmPassword) {
      toast.error(
        "Password and Confirm Password must be same"
      );
      return;
    }

    if (data.password.length < 8) {
      toast.error(
        "Password must be at least 8 characters"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.register,
        data: {
          name: data.name.trim(),
          email: data.email.trim(),
          password: data.password,
          confirmPassword:
            data.confirmPassword,
        },
      });

      const responseData = response?.data;

      if (responseData?.error) {
        toast.error(responseData.message);
        return;
      }

      if (responseData?.success) {
        toast.success(responseData.message);

        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        navigate("/login");
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

        <h1 className="text-2xl font-semibold">
          Create Account
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Register to continue shopping.
        </p>

        <form
          className="grid gap-4 mt-6"
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <div className="grid gap-1">
            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
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

          {/* Email */}
          <div className="grid gap-1">
            <label htmlFor="email">
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

          {/* Password */}
          <div className="grid gap-1">
            <label htmlFor="password">
              Password
            </label>

            <div
              className="
                bg-blue-50
                p-2
                border
                rounded
                flex
                items-center
                focus-within:border-[#ffbf00]
              "
            >
              <input
                id="password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                autoComplete="new-password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="
                  w-full
                  outline-none
                  bg-transparent
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
                }
              >
                {showPassword ? (
                  <FaRegEye />
                ) : (
                  <FaRegEyeSlash />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <div
              className="
                bg-blue-50
                p-2
                border
                rounded
                flex
                items-center
                focus-within:border-[#ffbf00]
              "
            >
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                autoComplete="new-password"
                value={
                  data.confirmPassword
                }
                onChange={handleChange}
                placeholder="Confirm password"
                className="
                  w-full
                  outline-none
                  bg-transparent
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
              >
                {showConfirmPassword ? (
                  <FaRegEye />
                ) : (
                  <FaRegEyeSlash />
                )}
              </button>
            </div>
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
            {loading
              ? "Creating Account..."
              : "Register"}
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
              cursor-pointer
            "
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;