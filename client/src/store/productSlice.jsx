
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategory: [],
  allSubCategory: [],
  product: [],
  loadingCategory: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = action.payload;
    },

    setAllSubCategory: (state, action) => {
      state.allSubCategory = action.payload;
    },

    setProducts: (state, action) => {
      state.product = action.payload;
    },

    setLoadingCategory: (state, action) => {
      state.loadingCategory = action.payload;
    },

    clearProducts: (state) => {
      state.product = [];
    },

    clearCategories: (state) => {
      state.allCategory = [];
      state.allSubCategory = [];
    },

    resetProductState: () => initialState,
  },
});

export const {
  setAllCategory,
  setAllSubCategory,
  setProducts,
  setLoadingCategory,
  clearProducts,
  clearCategories,
  resetProductState,
} = productSlice.actions;

export default productSlice.reducer;