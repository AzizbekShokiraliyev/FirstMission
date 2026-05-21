// productSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  searchQuery: string;
  sortBy: string;
  allProducts: unknown[];
}

const initialState: ProductState = {
  searchQuery: "",
  sortBy: "",
  allProducts: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setAllProducts: (state, action: PayloadAction<unknown[]>) => {
      state.allProducts = action.payload;
    },
  },
});

export const { setSearchQuery, setSortBy, setAllProducts } = productSlice.actions;
export default productSlice.reducer;