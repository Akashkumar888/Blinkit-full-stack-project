import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
      return;
    }

    setData((prev) => ({
      ...prev,
      email: location.state.email,
    }));
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validValue = Object.values(data).every(
    (item) => item.trim() !== ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      data.newPassword !==
      data.confirmPassword
    ) {
      toast.error(
        "New Password and Confirm Password must be same"
      );
      return;
    }

    if (data.newPassword.length < 8) {
      toast.error(
        "Password must be at least 8 characters"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.resetPassword,
        data: {
          email: data.email,
          newPassword:
            data.newPassword,
          confirmPassword:
            data.confirmPassword,
        },
      });

      const responseData =
        response?.data;

      if (responseData?.error) {
        toast.error(
          responseData.message
        );
        return;
      }

      if (responseData?.success) {
        toast.success(
          responseData.message
        );

        setData({
          email: "",
          newPassword: "",
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

        <h1 className="text-xl font-semibold">
          Reset Password
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Create a new password for
          your account.
        </p>

        <form
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
        >
          {/* New Password */}
          <div className="grid gap-1">
            <label htmlFor="newPassword">
              New Password
            </label>

            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-[#ffbf00]">
              <input
                id="newPassword"
                name="newPassword"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={
                  data.newPassword
                }
                onChange={
                  handleChange
                }
                autoComplete="new-password"
                placeholder="Enter new password"
                className="w-full outline-none bg-transparent"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (prev) =>
                      !prev
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

            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-[#ffbf00]">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={
                  data.confirmPassword
                }
                onChange={
                  handleChange
                }
                autoComplete="new-password"
                placeholder="Confirm password"
                className="w-full outline-none bg-transparent"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (
                      prev
                    ) =>
                      !prev
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
            disabled={
              !validValue ||
              loading
            }
            className={`
              text-white
              py-2
              rounded
              font-semibold
              transition-all
              ${
                validValue &&
                !loading
                  ? "bg-green-800 hover:bg-green-700"
                  : "bg-gray-500 cursor-not-allowed"
              }
            `}
          >
            {loading
              ? "Updating Password..."
              : "Change Password"}
          </button>
        </form>

        <p className="mt-4">
          Back to{" "}
          <Link
            to="/login"
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;