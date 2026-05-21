import { createSlice, } from '@reduxjs/toolkit'; // Importlar qo'shildi
import type {PayloadAction } from '@reduxjs/toolkit';

// 1. Interfeysni shu yerda e'lon qiling
interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null; 
}

interface AuthState {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState, 
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<UserData | null>) => { 
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    }
  }
});

export const { setUser, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;