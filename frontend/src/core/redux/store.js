import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'
import investmentReducer from './features/investments/investmentSlice'
import actionReducer from './features/actions/actionSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    investment: investmentReducer,
    action: actionReducer
  },
});
