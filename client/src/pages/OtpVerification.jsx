import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const OTP_LENGTH = 6;

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location?.state?.email;

  const inputRefs = useRef([]);

  const [otp, setOtp] = useState(
    Array(OTP_LENGTH).fill("")
  );

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", {
        replace: true,
      });
      return;
    }

    inputRefs.current[0]?.focus();
  }, [email, navigate]);

  const isFormValid = otp.every(
    (digit) => digit !== ""
  );

  const handleChange = (
    e,
    index
  ) => {
    const value = e.target.value.replace(
      /\D/g,
      ""
    );

    if (!value) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (index < OTP_LENGTH - 1) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  const handleKeyDown = (
    e,
    index
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[
        index - 1
      ]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData =
      e.clipboardData
        .getData("text")
        .trim()
        .slice(0, OTP_LENGTH)
        .replace(/\D/g, "");

    if (!pastedData) return;

    const newOtp = Array(
      OTP_LENGTH
    ).fill("");

    pastedData
      .split("")
      .forEach((digit, index) => {
        newOtp[index] = digit;
      });

    setOtp(newOtp);

    const focusIndex =
      Math.min(
        pastedData.length,
        OTP_LENGTH
      ) - 1;

    inputRefs.current[
      focusIndex
    ]?.focus();
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error(
        "Please enter OTP."
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await Axios({
          ...SummaryApi.forgot_password_otp_verification,
          data: {
            email,
            otp: otp.join(""),
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

        setOtp(
          Array(OTP_LENGTH).fill("")
        );

        navigate(
          "/reset-password",
          {
            state: {
              email,
              data: responseData,
            },
          }
        );
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
          OTP Verification
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Enter the 6-digit OTP
          sent to your email.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6"
        >
          <div className="grid gap-2">

            <label className="font-medium">
              Enter OTP
            </label>

            <div
              className="
                flex
                justify-between
                gap-2
              "
              onPaste={
                handlePaste
              }
            >
              {otp.map(
                (
                  digit,
                  index
                ) => (
                  <input
                    key={index}
                    ref={(element) =>
                      (inputRefs.current[
                        index
                      ] =
                        element)
                    }
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleChange(
                        e,
                        index
                      )
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(
                        e,
                        index
                      )
                    }
                    className="
                      h-14
                      w-14
                      rounded
                      border
                      bg-blue-50
                      text-center
                      text-xl
                      font-semibold
                      outline-none
                      focus:border-primary-200
                    "
                  />
                )
              )}
            </div>

          </div>

          <button
            type="submit"
            disabled={
              !isFormValid ||
              loading
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
              ? "Verifying..."
              : "Verify OTP"}
          </button>

        </form>

        <p className="mt-6 text-sm">
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

export default OtpVerification;