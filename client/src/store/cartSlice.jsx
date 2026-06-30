
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCartItems: (state, action) => {
      state.cart = action.payload;
    },

    clearCart: (state) => {
      state.cart = [];
    },

    addCartItem: (state, action) => {
      state.cart.push(action.payload);
    },

    removeCartItem: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const {
  setCartItems,
  clearCart,
  addCartItem,
  removeCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;