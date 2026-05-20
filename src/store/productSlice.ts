import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  searchQuery: string;
  refreshTrigger: number; // YANGI: Ro'yxatni yangilash uchun hisoblagich turi
  sortBy: string; // YANGI: "high-to-low", "low-to-high" yoki "" bo'ladi
  allProducts: unknown[];
}

const initialState: ProductState = {
  searchQuery: "",
  refreshTrigger: 0, // YANGI: Boshlang'ich qiymat 0/
  sortBy: "", // Boshida hech qanday saralash yo'q
  allProducts: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    // YANGI: Har safar chaqirilganda trigger qiymatini 1 taga oshiradi
    triggerRefresh: (state) => {
      state.refreshTrigger += 1;
    },
    // YANGI REDUCER: Saralash turini o'zgartirish uchun
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setAllProducts: (state, action: PayloadAction<unknown[]>) => {
      state.allProducts = action.payload;
    },
  },
});

// triggerRefresh ham eksportlar qatoriga qo'shildi
export const { setSearchQuery, triggerRefresh, setSortBy, setAllProducts } = productSlice.actions;

export default productSlice.reducer;