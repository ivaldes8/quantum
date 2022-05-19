import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'
import investmentReducer from './features/investments/investmentSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    investment: investmentReducer
  },
});
