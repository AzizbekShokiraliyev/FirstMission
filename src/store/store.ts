import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice' 
import productReducer from './productSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch