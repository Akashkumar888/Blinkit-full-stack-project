import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  FaRegEye,
  FaRegEyeSlash,
} from "react-icons/fa6";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/", { replace: true });
      return;
    }

    if (location?.state?.email) {
      setFormData((prev) => ({
        ...prev,
        email: location.state.email,
      }));
    }
  }, [location, navigate]);

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

      if (
        formData.newPassword !==
        formData.confirmPassword
      ) {
        toast.error(
          "New Password and Confirm Password must be the same."
        );
        return;
      }

      try {
        setLoading(true);

        const response = await Axios({
          ...SummaryApi.resetPassword,
          data: formData,
        });

        const { data: responseData } = response;

        if (responseData.success) {
          toast.success(responseData.message);

          setFormData({
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
    },
    [formData, navigate]
  );

  return (
    <section className="container mx-auto w-full px-2">
      <div className="bg-white my-4 mx-auto w-full max-w-lg rounded p-7">

        <h2 className="text-xl font-semibold">
          Reset Password
        </h2>

        <p className="text-neutral-500 mt-1">
          Enter your new password.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 mt-6"
        >

          {/* New Password */}

          <div className="grid gap-1">
            <label
              htmlFor="newPassword"
              className="font-medium"
            >
              New Password
            </label>

            <div className="flex items-center border rounded bg-blue-50 px-2 focus-within:border-primary-200">

              <input
                id="newPassword"
                name="newPassword"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
                required
                className="w-full bg-transparent py-2 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="cursor-pointer text-neutral-600"
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
            <label
              htmlFor="confirmPassword"
              className="font-medium"
            >
              Confirm Password
            </label>

            <div className="flex items-center border rounded bg-blue-50 px-2 focus-within:border-primary-200">

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="w-full bg-transparent py-2 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
                className="cursor-pointer text-neutral-600"
              >
                {showConfirmPassword ? (
                  <FaRegEye />
                ) : (
                  <FaRegEyeSlash />
                )}
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
            {loading
              ? "Changing Password..."
              : "Change Password"}
          </button>

        </form>

        <p className="mt-5 text-sm">
          Already have an account?{" "}
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