
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa6";
import toast from "react-hot-toast";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "./Loading";
import { useGlobalContext } from "../provider/GlobalProvider";

const AddToCartButton = ({ data }) => {
  const {
    fetchCartItem,
    updateCartItem,
    deleteCartItem,
  } = useGlobalContext();

  const cartItems = useSelector(
    (state) => state.cartItem.cart
  );

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [isAvailableCart, setIsAvailableCart] =
    useState(false);

  const [qty, setQty] = useState(0);

  const [cartItemDetails, setCartItemDetails] =
    useState(null);

  /*
  -----------------------------------
  Check product exists in cart
  -----------------------------------
  */

  useEffect(() => {
    if (!data?._id) return;

    const product = cartItems.find(
      (item) => item?.productId?._id === data._id
    );

    if (product) {
      setIsAvailableCart(true);
      setQty(product.quantity);
      setCartItemDetails(product);
    } else {
      setIsAvailableCart(false);
      setQty(0);
      setCartItemDetails(null);
    }
  }, [cartItems, data]);

  /*
  -----------------------------------
  Add To Cart
  -----------------------------------
  */

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.addTocart,
        data: {
          productId: data?._id,
        },
      });

      const responseData = response.data;

      if (responseData.success) {
        toast.success(responseData.message);

        await fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  /*
  -----------------------------------
  Increase Qty
  -----------------------------------
  */

  const increaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cartItemDetails?._id) return;

    try {
      setUpdating(true);

      const response = await updateCartItem(
        cartItemDetails._id,
        qty + 1
      );

      if (response?.success) {
        toast.success("Item quantity updated");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setUpdating(false);
    }
  };

  /*
  -----------------------------------
  Decrease Qty
  -----------------------------------
  */

  const decreaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cartItemDetails?._id) return;

    try {
      setUpdating(true);

      if (qty === 1) {
        await deleteCartItem(cartItemDetails._id);

        toast.success("Item removed");
      } else {
        const response = await updateCartItem(
          cartItemDetails._id,
          qty - 1
        );

        if (response?.success) {
          toast.success("Item quantity updated");
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setUpdating(false);
    }
  };

  /*
  -----------------------------------
  UI
  -----------------------------------
  */

  if (isAvailableCart) {
    return (
      <div className="w-full max-w-[150px]">

        <div className="flex items-center rounded overflow-hidden">

          <button
            onClick={decreaseQty}
            disabled={updating}
            className="
              flex-1
              bg-green-700
              hover:bg-green-600
              text-white
              p-2
              flex
              justify-center
              items-center
              disabled:bg-gray-400
            "
          >
            <FaMinus size={12} />
          </button>

          <div className="flex-1 text-center font-semibold">
            {updating ? (
              <Loading />
            ) : (
              qty
            )}
          </div>

          <button
            onClick={increaseQty}
            disabled={updating}
            className="
              flex-1
              bg-green-700
              hover:bg-green-600
              text-white
              p-2
              flex
              justify-center
              items-center
              disabled:bg-gray-400
            "
          >
            <FaPlus size={12} />
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="w-full max-w-[150px]">

      <button
        onClick={handleAddToCart}
        disabled={loading}
        className={`
          w-full
          rounded
          py-2
          font-medium
          text-white
          transition
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-700 hover:bg-green-600"
          }
        `}
      >
        {loading ? <Loading /> : "Add"}
      </button>

    </div>
  );
};

export default AddToCartButton;