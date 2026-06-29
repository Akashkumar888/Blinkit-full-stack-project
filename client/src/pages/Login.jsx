import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
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
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.login,
        data: {
          email: data.email.trim(),
          password: data.password,
        },
      });

      const responseData = response?.data;

      if (responseData?.error) {
        toast.error(responseData.message);
        return;
      }

      if (responseData?.success) {
        toast.success(responseData.message);

        /*
        If backend sends httpOnly cookies:
        DON'T save tokens in localStorage.
        Browser will automatically store cookies.
        */

        localStorage.setItem(
          "accessToken",
          responseData.data.accessToken
        );

        localStorage.setItem(
          "refreshToken",
          responseData.data.refreshToken
        );

        const userDetails=await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));

        setData({
          email: "",
          password: "",
        });

        navigate("/");
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

        <h1 className="text-2xl font-semibold mb-2">
          Login
        </h1>

        <p className="text-gray-500 text-sm mb-4">
          Welcome back! Please login to continue.
        </p>

        <form
          className="grid gap-4"
          onSubmit={handleSubmit}
        >
          {/* Email */}
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

          {/* Password */}
          <div className="grid gap-1">
            <label
              htmlFor="password"
              className="font-medium"
            >
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
                autoComplete="current-password"
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
                className="cursor-pointer"
              >
                {showPassword ? (
                  <FaRegEye />
                ) : (
                  <FaRegEyeSlash />
                )}
              </button>
            </div>
          </div>

          <Link
            to="/forgot-password"
            className="
              ml-auto
              text-sm
              hover:text-[#ffbf00]
            "
          >
            Forgot Password?
          </Link>

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
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p className="mt-5">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
              font-semibold
              text-green-700
              hover:text-green-800
              cursor-pointer
            "
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;