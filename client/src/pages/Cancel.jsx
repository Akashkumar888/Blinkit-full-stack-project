
import React from "react";

import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";

const Cancel = () => {
  return (
    <main
      className="
        flex
        min-h-[70vh]
        items-center
        justify-center
        bg-gray-50
        p-4
      "
    >
      <section
        className="
          w-full
          max-w-md
          rounded-xl
          border
          border-red-200
          bg-white
          p-8
          text-center
          shadow-sm
        "
      >
        {/* Icon */}

        <div className="flex justify-center">
          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-red-100
              text-red-600
            "
          >
            <MdCancel size={50} />
          </div>
        </div>

        {/* Title */}

        <h1
          className="
            mt-6
            text-2xl
            font-bold
            text-red-600
          "
        >
          Order Cancelled
        </h1>

        {/* Description */}

        <p
          className="
            mt-2
            text-sm
            text-gray-600
          "
        >
          Your order has been cancelled successfully.
        </p>

        {/* Button */}

        <Link
          to="/"
          replace
          className="
            mt-6
            inline-flex
            items-center
            justify-center
            rounded-lg
            border
            border-red-600
            px-5
            py-2
            font-medium
            text-red-600
            transition
            hover:bg-red-600
            hover:text-white
          "
        >
          Go To Home
        </Link>
      </section>
    </main>
  );
};

export default Cancel;