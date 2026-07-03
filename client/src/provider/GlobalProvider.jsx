import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { pricewithDiscount } from "../utils/PriceWithDiscount";

import { setCartItems } from "../store/cartSlice";
import {
  setAddressList,
  clearAddressList,
} from "../store/addressSlice";
import { setOrder } from "../store/orderSlice";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);

  /* ================= Cart ================= */

  const fetchCartItem = useCallback(async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItem,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setCartItems(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  }, [dispatch]);

  const updateCartItem = useCallback(
    async (id, qty) => {
      try {
        const response = await Axios({
          ...SummaryApi.updateCartItemQty,
          data: {
            _id: id,
            qty,
          },
        });

        const { data: responseData } = response;

        if (responseData.success) {
          await fetchCartItem();
          return responseData;
        }
      } catch (error) {
        AxiosToastError(error);
        return null;
      }
    },
    [fetchCartItem],
  );

  const deleteCartItem = useCallback(
    async (cartId) => {
      try {
        const response = await Axios({
          ...SummaryApi.deleteCartItem,
          data: {
            _id: cartId,
          },
        });

        const { data: responseData } = response;

        if (responseData.success) {
          toast.success(responseData.message);
          fetchCartItem();
        }
      } catch (error) {
        AxiosToastError(error);
      }
    },
    [fetchCartItem],
  );

  /* ================= Address ================= */

  const fetchAddress = useCallback(async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getAddress,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setAddressList(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  }, [dispatch]);

  /* ================= Orders ================= */

  const fetchOrder = useCallback(async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getOrderItems,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setOrder(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  }, [dispatch]);

  /* ================= Logout ================= */

  const handleLogout = useCallback(() => {
    localStorage.clear();

    dispatch(setCartItems([]));
    dispatch(clearAddressList());
    dispatch(setOrder([]));
  }, [dispatch]);

  /* ================= Derived Values ================= */

  const totalQty = useMemo(() => {
    return cartItem.reduce((total, item) => total + item.quantity, 0);
  }, [cartItem]);

  const totalPrice = useMemo(() => {
    return cartItem.reduce((total, item) => {
      const price = pricewithDiscount(
        item.productId?.price,
        item.productId?.discount,
      );

      return total + price * item.quantity;
    }, 0);
  }, [cartItem]);

  const notDiscountTotalPrice = useMemo(() => {
    return cartItem.reduce((total, item) => {
      return total + item.productId?.price * item.quantity;
    }, 0);
  }, [cartItem]);

  /* ================= Initial Fetch ================= */

  useEffect(() => {
    if (!user?._id) {
      handleLogout();
      return;
    }

    fetchCartItem();
    fetchAddress();
    fetchOrder();
  }, [user?._id, fetchCartItem, fetchAddress, fetchOrder, handleLogout]);

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        fetchAddress,
        fetchOrder,
        handleLogout,

        totalQty,
        totalPrice,
        notDiscountTotalPrice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
