
import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaCaretRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import AddToCartButton from "./AddToCartButton";

import imageEmpty from "../assets/empty_cart.webp";

import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { pricewithDiscount } from "../utils/PriceWithDiscount";

const DisplayCartItem = ({ close }) => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const cartItems = useSelector(
    (state) => state.cartItem.cart
  );

  const {
    totalPrice,
    totalQty,
    notDiscountTotalPrice,
  } = useGlobalContext();

  const totalSaving = useMemo(() => {
    return notDiscountTotalPrice - totalPrice;
  }, [notDiscountTotalPrice, totalPrice]);

  const handleCheckout = () => {
    if (!user?._id) {
      toast("Please login first");
      return;
    }

    navigate("/checkout");

    close?.();
  };

  return (
    <section
      className="
        fixed
        inset-0
        z-50
        bg-black/60
      "
    >
      <div
        className="
          ml-auto
          flex
          h-screen
          w-full
          max-w-sm
          flex-col
          bg-white
        "
      >
        {/* Header */}

        <header
          className="
            flex
            items-center
            justify-between
            p-4
            shadow
          "
        >
          <h2 className="text-lg font-semibold">
            Shopping Cart
          </h2>

          {close ? (
            <button
              onClick={close}
              aria-label="Close Cart"
            >
              <IoClose size={24} />
            </button>
          ) : (
            <Link
              to="/"
              aria-label="Close Cart"
            >
              <IoClose size={24} />
            </Link>
          )}
        </header>

        {/* Body */}

        <main
          className="
            flex-1
            overflow-y-auto
            bg-blue-50
            p-3
          "
        >
          {!cartItems.length ? (
            <div
              className="
                flex
                h-full
                flex-col
                items-center
                justify-center
                rounded-lg
                bg-white
                p-5
              "
            >
              <img
                src={imageEmpty}
                alt="Empty Cart"
                loading="lazy"
                className="w-60 object-contain"
              />

              <h3 className="mt-4 text-lg font-semibold">
                Your cart is empty
              </h3>

              <p className="mt-1 text-gray-500">
                Add products to continue shopping.
              </p>

              <Link
                to="/"
                onClick={close}
                className="
                  mt-5
                  rounded
                  bg-green-600
                  px-5
                  py-2
                  text-white
                  transition
                  hover:bg-green-700
                "
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <>
              {/* Saving */}

              <div
                className="
                  mb-4
                  flex
                  justify-between
                  rounded-full
                  bg-blue-100
                  px-4
                  py-2
                  text-blue-600
                "
              >
                <span>Your Savings</span>

                <span>
                  {DisplayPriceInRupees(totalSaving)}
                </span>
              </div>

              {/* Cart Items */}

              <div
                className="
                  space-y-4
                  rounded-lg
                  bg-white
                  p-4
                "
              >
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="
                      flex
                      gap-4
                    "
                  >
                    <div
                      className="
                        h-16
                        w-16
                        rounded
                        border
                      "
                    >
                      <img
                        src={
                          item.productId?.image?.[0]
                        }
                        alt={item.productId?.name}
                        loading="lazy"
                        className="
                          h-full
                          w-full
                          object-contain
                        "
                      />
                    </div>

                    <div className="flex-1">
                      <h4
                        className="
                          line-clamp-2
                          text-sm
                          font-medium
                        "
                      >
                        {item.productId?.name}
                      </h4>

                      <p
                        className="
                          text-xs
                          text-gray-500
                        "
                      >
                        {item.productId?.unit}
                      </p>

                      <p className="font-semibold">
                        {DisplayPriceInRupees(
                          pricewithDiscount(
                            item.productId?.price,
                            item.productId?.discount
                          )
                        )}
                      </p>
                    </div>

                    <AddToCartButton
                      data={item.productId}
                    />
                  </div>
                ))}
              </div>

              {/* Bill */}

              <div
                className="
                  mt-4
                  rounded-lg
                  bg-white
                  p-4
                "
              >
                <h3 className="mb-3 font-semibold">
                  Bill Details
                </h3>

                <div className="space-y-2 text-sm">

                  <div className="flex justify-between">
                    <span>Items Total</span>

                    <span>
                      <span className="mr-2 text-gray-400 line-through">
                        {DisplayPriceInRupees(
                          notDiscountTotalPrice
                        )}
                      </span>

                      {DisplayPriceInRupees(
                        totalPrice
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Quantity</span>

                    <span>{totalQty} Items</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery</span>

                    <span>FREE</span>
                  </div>

                  <hr />

                  <div className="flex justify-between font-semibold text-base">
                    <span>Grand Total</span>

                    <span>
                      {DisplayPriceInRupees(
                        totalPrice
                      )}
                    </span>
                  </div>

                </div>
              </div>
            </>
          )}
        </main>

        {/* Footer */}

        {cartItems.length > 0 && (
          <footer className="border-t p-3">
            <button
              onClick={handleCheckout}
              className="
                flex
                w-full
                items-center
                justify-between
                rounded
                bg-green-700
                px-4
                py-3
                font-semibold
                text-white
                transition
                hover:bg-green-800
              "
            >
              <span>
                {DisplayPriceInRupees(totalPrice)}
              </span>

              <span className="flex items-center gap-1">
                Proceed
                <FaCaretRight />
              </span>
            </button>
          </footer>
        )}
      </div>
    </section>
  );
};

export default DisplayCartItem;