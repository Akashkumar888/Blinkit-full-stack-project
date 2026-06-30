
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addressList: [],
};

const addressSlice = createSlice({
  name: "address",
  initialState,

  reducers: {
    setAddressList: (state, action) => {
      state.addressList = action.payload;
    },

    clearAddressList: (state) => {
      state.addressList = [];
    },
  },
});

export const {
  setAddressList,
  clearAddressList,
} = addressSlice.actions;

export default addressSlice.reducer;