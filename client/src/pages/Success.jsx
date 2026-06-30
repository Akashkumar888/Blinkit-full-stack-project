
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();

  const successText = location.state?.text || "Payment";

  return (
    <section className="flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-green-100 p-6 shadow-md">

        <div className="flex flex-col items-center gap-5">

          <h1 className="text-center text-2xl font-bold text-green-700">
            {successText} Successful
          </h1>

          <p className="text-center text-sm text-green-600">
            Your request has been completed successfully.
          </p>

          <Link
            to="/"
            className="rounded border border-green-700 px-5 py-2 font-medium text-green-700 transition hover:bg-green-700 hover:text-white"
          >
            Go To Home
          </Link>

        </div>

      </div>
    </section>
  );
};

export default Success;