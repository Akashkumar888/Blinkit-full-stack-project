
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { FaCartShopping } from "react-icons/fa6";
import { FaCaretRight } from "react-icons/fa";

import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";

const CartMobileLink = () => {
  const { totalPrice, totalQty } = useGlobalContext();

  const cartItems = useSelector(
    (state) => state.cartItem.cart
  );

  if (!cartItems?.length) return null;

  return (
    <div className="sticky bottom-4 z-40 px-2 lg:hidden">
      <div
        className="
          flex
          items-center
          justify-between
          rounded-lg
          bg-green-600
          px-3
          py-2
          text-white
          shadow-lg
        "
      >
        {/* Cart Info */}

        <div className="flex items-center gap-3">

          <div className="rounded bg-green-500 p-2">
            <FaCartShopping size={18} />
          </div>

          <div className="text-xs leading-5">
            <p className="font-medium">
              {totalQty} {totalQty > 1 ? "Items" : "Item"}
            </p>

            <p className="font-semibold">
              {DisplayPriceInRupees(totalPrice)}
            </p>
          </div>

        </div>

        {/* View Cart */}

        <Link
          to="/cart"
          aria-label="View Cart"
          className="
            flex
            items-center
            gap-1
            font-medium
            transition-all
            hover:translate-x-1
          "
        >
          <span>View Cart</span>
          <FaCaretRight />
        </Link>

      </div>
    </div>
  );
};

export default CartMobileLink;