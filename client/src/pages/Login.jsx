import React, {
  useCallback,
  useState,
} from "react";

import {
  FaRegEye,
  FaRegEyeSlash,
} from "react-icons/fa6";

import toast from "react-hot-toast";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useDispatch } from "react-redux";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import fetchUserDetails from "../utils/fetchUserDetails";

import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const isFormValid = Object.values(
    formData
  ).every((value) => value.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error(
        "Please fill all fields."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.login,
        data: {
          email:
            formData.email.trim(),
          password:
            formData.password,
        },
      });

      const responseData =
        response.data;

      if (responseData.error) {
        toast.error(
          responseData.message
        );
        return;
      }

      if (responseData.success) {
        toast.success(
          responseData.message
        );

        localStorage.setItem(
          "accessToken",
          responseData.data
            .accessToken
        );

        localStorage.setItem(
          "refreshToken",
          responseData.data
            .refreshToken
        );

        const userDetails =
          await fetchUserDetails();

        dispatch(
          setUserDetails(
            userDetails.data
          )
        );

        setFormData({
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
    <section className="container mx-auto w-full px-2">
      <div className="mx-auto my-6 w-full max-w-lg rounded bg-white p-7 shadow-sm">

        <h1 className="mb-2 text-2xl font-semibold">
          Login
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Welcome back! Please sign in to
          continue.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4"
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
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
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
                flex
                items-center
                rounded
                border
                bg-blue-50
                p-2
                focus-within:border-primary-200
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="
                  w-full
                  bg-transparent
                  outline-none
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

            <Link
              to="/forgot-password"
              className="
                ml-auto
                text-sm
                hover:text-primary-200
              "
            >
              Forgot Password?
            </Link>

          </div>

          <button
            type="submit"
            disabled={
              !isFormValid || loading
            }
            className={`
              rounded
              py-2
              font-semibold
              tracking-wide
              text-white
              transition-all
              ${
                isFormValid &&
                !loading
                  ? "bg-green-800 hover:bg-green-700"
                  : "cursor-not-allowed bg-gray-500"
              }
            `}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p className="mt-5 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
              cursor-pointer
              font-semibold
              text-green-700
              hover:text-green-800 
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