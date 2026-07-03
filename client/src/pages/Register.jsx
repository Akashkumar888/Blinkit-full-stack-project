import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const isValid = Object.values(formData).every(Boolean);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (formData.password !== formData.confirmPassword) {
        toast.error("Password and Confirm Password must be the same.");
        return;
      }

      try {
        setLoading(true);

        const response = await Axios({
          ...SummaryApi.register,
          data: formData,
        });

        const { data: responseData } = response;

        if (responseData.success) {
          toast.success(responseData.message);

          setFormData({
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
    },
    [formData, navigate],
  );

  return (
    <section className="container mx-auto w-full px-2">
      <div className="bg-white rounded p-7 my-4 mx-auto w-full max-w-lg">
        <h2 className="text-2xl font-semibold">Welcome to Binkeyit</h2>

        <p className="text-neutral-500 mt-1">
          Create your account to continue.
        </p>

        <form onSubmit={handleSubmit} className="grid gap-5 mt-6">
          {/* Name */}

          <div className="grid gap-1">
            <label htmlFor="name" className="font-medium">
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoFocus
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="bg-blue-50 border rounded p-2 outline-none focus:border-primary-200"
            />
          </div>

          {/* Email */}

          <div className="grid gap-1">
            <label htmlFor="email" className="font-medium">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="bg-blue-50 border rounded p-2 outline-none focus:border-primary-200"
            />
          </div>

          {/* Password */}

          <div className="grid gap-1">
            <label htmlFor="password" className="font-medium">
              Password
            </label>

            <div className="bg-blue-50 border rounded flex items-center px-2 focus-within:border-primary-200">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none py-2"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer text-neutral-600"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}

          <div className="grid gap-1">
            <label htmlFor="confirmPassword" className="font-medium">
              Confirm Password
            </label>

            <div className="bg-blue-50 border rounded flex items-center px-2 focus-within:border-primary-200">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full bg-transparent outline-none py-2"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="cursor-pointer text-neutral-600"
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={!isValid || loading}
            className={`
              py-2
              rounded
              font-semibold
              tracking-wide
              text-white
              transition
              ${
                isValid && !loading
                  ? "bg-green-800 hover:bg-green-700"
                  : "bg-gray-500 cursor-not-allowed"
              }
            `}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="mt-5 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-green-700 hover:text-green-800 cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
