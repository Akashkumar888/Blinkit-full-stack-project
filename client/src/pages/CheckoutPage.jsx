
import React, {
  useCallback,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

import { useGlobalContext } from "../provider/GlobalProvider";

import AddAddress from "../components/AddAddress";

import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const {
    totalPrice,
    totalQty,
    notDiscountTotalPrice,
    fetchCartItem,
    fetchOrder,
  } = useGlobalContext();

  const addressList = useSelector(
    (state) => state.addresses.addressList
  );

  const cartItems = useSelector(
    (state) => state.cartItem.cart
  );

  const [selectedAddressIndex, setSelectedAddressIndex] =
    useState(0);

  const [isAddressModalOpen, setIsAddressModalOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const selectedAddress =
    addressList[selectedAddressIndex];

  const createOrderPayload = () => ({
    list_items: cartItems,
    addressId: selectedAddress?._id,
    subTotalAmt: totalPrice,
    totalAmt: totalPrice,
  });

  const validateCheckout = () => {
    if (!selectedAddress) {
      toast.error(
        "Please select an address."
      );
      return false;
    }

    if (!cartItems.length) {
      toast.error("Your cart is empty.");
      return false;
    }

    return true;
  };

  const handleCashOnDelivery =
    useCallback(async () => {
      if (!validateCheckout()) return;

      try {
        setLoading(true);

        const response = await Axios({
          ...SummaryApi.CashOnDeliveryOrder,
          data: createOrderPayload(),
        });

        const {
          data: responseData,
        } = response;

        if (responseData.success) {
          toast.success(
            responseData.message
          );

          await Promise.all([
            fetchCartItem?.(),
            fetchOrder?.(),
          ]);

          navigate("/success", {
            state: {
              text: "Order",
            },
          });
        }
      } catch (error) {
        AxiosToastError(error);
      } finally {
        setLoading(false);
      }
    }, [
      selectedAddress,
      cartItems,
      totalPrice,
      fetchCartItem,
      fetchOrder,
      navigate,
    ]);

  const handleOnlinePayment =
    useCallback(async () => {
      if (!validateCheckout()) return;

      try {
        setLoading(true);

        const stripe =
          await loadStripe(
            import.meta.env
              .VITE_STRIPE_PUBLIC_KEY
          );

        if (!stripe) {
          toast.error(
            "Stripe failed to load."
          );
          return;
        }

        const response = await Axios({
          ...SummaryApi.payment_url,
          data: createOrderPayload(),
        });

        const {
          data: responseData,
        } = response;

        await stripe.redirectToCheckout({
          sessionId:
            responseData.id,
        });
      } catch (error) {
        AxiosToastError(error);
      } finally {
        setLoading(false);
      }
    }, [
      selectedAddress,
      cartItems,
      totalPrice,
    ]);

  return (
    <section className="bg-blue-50 min-h-screen">

      <div
        className="
          container
          mx-auto
          flex
          flex-col
          gap-6
          p-4
          lg:flex-row
        "
      >
        {/* Address */}

        <div className="flex-1">

          <h2 className="mb-3 text-xl font-semibold">
            Choose Delivery Address
          </h2>

          <div className="space-y-4">

            {addressList.map(
              (address, index) =>
                address.status && (
                  <label
                    key={address._id}
                    htmlFor={`address-${index}`}
                    className="block cursor-pointer"
                  >
                    <div
                      className="
                        flex
                        gap-4
                        rounded-lg
                        border
                        bg-white
                        p-4
                        transition
                        hover:bg-blue-50
                      "
                    >
                      <input
                        id={`address-${index}`}
                        type="radio"
                        name="address"
                        checked={
                          selectedAddressIndex ===
                          index
                        }
                        onChange={() =>
                          setSelectedAddressIndex(
                            index
                          )
                        }
                      />

                      <div className="text-sm">

                        <p>
                          {
                            address.address_line
                          }
                        </p>

                        <p>
                          {address.city}
                        </p>

                        <p>
                          {address.state}
                        </p>

                        <p>
                          {
                            address.country
                          }{" "}
                          -
                          {" "}
                          {
                            address.pincode
                          }
                        </p>

                        <p>
                          {
                            address.mobile
                          }
                        </p>

                      </div>
                    </div>
                  </label>
                )
            )}

            <button
              type="button"
              onClick={() =>
                setIsAddressModalOpen(
                  true
                )
              }
              className="
                flex
                h-16
                w-full
                items-center
                justify-center
                rounded-lg
                border-2
                border-dashed
                bg-white
                font-medium
                transition
                hover:bg-blue-100
              "
            >
              + Add New Address
            </button>

          </div>

        </div>

        {/* Summary */}

        <aside
          className="
            w-full
            max-w-md
            rounded-lg
            bg-white
            p-5
            shadow-sm
          "
        >
          <h2 className="mb-4 text-xl font-semibold">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span>
                Items Total
              </span>

              <span className="flex gap-2">

                <span className="text-neutral-400 line-through">
                  {DisplayPriceInRupees(
                    notDiscountTotalPrice
                  )}
                </span>

                <span>
                  {DisplayPriceInRupees(
                    totalPrice
                  )}
                </span>

              </span>
            </div>

            <div className="flex justify-between">
              <span>
                Quantity
              </span>

              <span>
                {totalQty} Items
              </span>
            </div>

            <div className="flex justify-between">
              <span>
                Delivery
              </span>

              <span>Free</span>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-semibold">

              <span>
                Grand Total
              </span>

              <span>
                {DisplayPriceInRupees(
                  totalPrice
                )}
              </span>

            </div>

          </div>

          <div className="mt-6 flex flex-col gap-4">

            <button
              type="button"
              disabled={loading}
              onClick={
                handleOnlinePayment
              }
              className="
                rounded
                bg-green-700
                py-3
                font-semibold
                text-white
                transition
                hover:bg-green-600
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading
                ? "Processing..."
                : "Pay Online"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={
                handleCashOnDelivery
              }
              className="
                rounded
                border-2
                border-green-700
                py-3
                font-semibold
                text-green-700
                transition
                hover:bg-green-700
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading
                ? "Processing..."
                : "Cash on Delivery"}
            </button>

          </div>

        </aside>

      </div>

      {isAddressModalOpen && (
        <AddAddress
          close={() =>
            setIsAddressModalOpen(
              false
            )
          }
        />
      )}
    </section>
  );
};

export default CheckoutPage;