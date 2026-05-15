import { configureStore } from '@reduxjs/toolkit'
// 1. authSlice-dan reducerni import qiling
import authReducer from './authSlice' 

export const store = configureStore({
  reducer: {
    auth: authReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch