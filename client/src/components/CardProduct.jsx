
import React from "react";
import { Link } from "react-router-dom";

import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import { valideURLConvert } from "../utils/valideURLConvert";

import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ data }) => {
  const productUrl = `/product/${valideURLConvert(data?.name)}-${data?._id}`;

  const discountedPrice = pricewithDiscount(
    data?.price,
    data?.discount
  );

  return (
    <Link
      to={productUrl}
      className="
        min-w-36
        lg:min-w-52
        rounded-lg
        border
        bg-white
        p-2
        lg:p-4
        grid
        gap-2
        lg:gap-3
        transition-all
        duration-200
        hover:shadow-md
      "
    >
      {/* Product Image */}

      <div className="h-24 lg:h-36 overflow-hidden rounded">
        <img
          src={data?.image?.[0]}
          alt={data?.name}
          loading="lazy"
          className="
            h-full
            w-full
            object-scale-down
            transition-transform
            duration-300
            hover:scale-110
          "
        />
      </div>

      {/* Delivery + Discount */}

      <div className="flex items-center justify-between">

        <span
          className="
            rounded
            bg-green-50
            px-2
            py-[2px]
            text-xs
            text-green-700
          "
        >
          10 min
        </span>

        {Boolean(data?.discount) && (
          <span
            className="
              rounded-full
              bg-green-100
              px-2
              py-[2px]
              text-xs
              font-medium
              text-green-700
            "
          >
            {data.discount}% OFF
          </span>
        )}

      </div>

      {/* Product Name */}

      <h2
        className="
          line-clamp-2
          text-sm
          lg:text-base
          font-medium
        "
      >
        {data?.name}
      </h2>

      {/* Unit */}

      <p className="text-sm text-gray-600">
        {data?.unit}
      </p>

      {/* Price */}

      <div className="flex items-center gap-2">

        <span className="font-semibold text-black">
          {DisplayPriceInRupees(discountedPrice)}
        </span>

        {Boolean(data?.discount) && (
          <span className="text-sm text-gray-400 line-through">
            {DisplayPriceInRupees(data?.price)}
          </span>
        )}

      </div>

      {/* Cart Button */}

      <div className="mt-auto">

        {data?.stock === 0 ? (
          <p className="text-center text-sm font-medium text-red-500">
            Out of Stock
          </p>
        ) : (
          <AddToCartButton data={data} />
        )}

      </div>

    </Link>
  );
};

export default CardProduct;