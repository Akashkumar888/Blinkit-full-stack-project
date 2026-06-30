import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },

    clearOrder: (state) => {
      state.order = [];
    },
  },
});

export const {
  setOrder,
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;