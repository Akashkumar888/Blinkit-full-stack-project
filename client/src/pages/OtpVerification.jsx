import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const OTP_LENGTH = 6;

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const inputRef = useRef([]);

  const [otp, setOtp] = useState(
    new Array(OTP_LENGTH).fill("")
  );

  const [loading, setLoading] = useState(false);

  const email = location?.state?.email;

  const validValue = otp.every(
    (digit) => digit !== ""
  );

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
      return;
    }

    inputRef.current[0]?.focus();
  }, [email, navigate]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData =
      e.clipboardData.getData("text");

    if (!/^\d+$/.test(pastedData)) return;

    const pastedOtp = pastedData
      .slice(0, OTP_LENGTH)
      .split("");

    const newOtp = [
      ...pastedOtp,
      ...new Array(
        OTP_LENGTH - pastedOtp.length
      ).fill(""),
    ];

    setOtp(newOtp);

    const lastIndex = Math.min(
      pastedOtp.length,
      OTP_LENGTH
    );

    inputRef.current[lastIndex - 1]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validValue) {
      toast.error(
        "Please enter complete OTP"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
          email,
          otp: otp.join(""),
        },
      });

      const responseData = response?.data;

      if (responseData?.error) {
        toast.error(responseData.message);
        return;
      }

      if (responseData?.success) {
        toast.success(responseData.message);

        setOtp(
          new Array(OTP_LENGTH).fill("")
        );

        navigate("/reset-password", {
          state: {
            email,
          },
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

        <h1 className="font-semibold text-xl">
          OTP Verification
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Enter the OTP sent to
          <span className="font-medium ml-1">
            {email}
          </span>
        </p>

        <form
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-2">
            <label>
              Enter Verification Code
            </label>

            <div
              className="flex items-center justify-between gap-2 mt-2"
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(ref) => {
                    inputRef.current[index] =
                      ref;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleChange(
                      e.target.value,
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
                    w-full
                    max-w-14
                    h-14
                    text-center
                    text-lg
                    font-semibold
                    bg-blue-50
                    border
                    rounded
                    outline-none
                    focus:border-[#ffbf00]
                  "
                />
              ))}
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
              transition-all
              ${
                validValue && !loading
                  ? "bg-green-800 hover:bg-green-700"
                  : "bg-gray-500 cursor-not-allowed"
              }
            `}
          >
            {loading
              ? "Verifying..."
              : "Verify OTP"}
          </button>
        </form>

        <p className="mt-4">
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