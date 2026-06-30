
import toast from "react-hot-toast";

import Axios from "./Axios";
import AxiosToastError from "./AxiosToastError";
import SummaryApi from "../common/SummaryApi";

/**
 * Add product to cart
 */
export const addToCartProduct = async (
  productId,
  quantity = 1
) => {
  try {
    if (!productId) {
      throw new Error("Product id is required.");
    }

    const { data: responseData } = await Axios({
      ...SummaryApi.addToCart,
      data: {
        productId,
        quantity,
      },
    });

    if (responseData.success) {
      toast.success(responseData.message);
    }

    return responseData;
  } catch (error) {
    AxiosToastError(error);

    return null;
  }
};

/**
 * Fetch all cart items
 */
export const getCartItems = async () => {
  try {
    const { data: responseData } = await Axios({
      ...SummaryApi.getCartItems,
    });

    return responseData;
  } catch (error) {
    AxiosToastError(error);

    return null;
  }
};