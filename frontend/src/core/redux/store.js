import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'
import groupReducer from './features/groups/groupSlice'
import investmentReducer from './features/investments/investmentSlice'
import actionReducer from './features/actions/actionSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    group: groupReducer,
    investment: investmentReducer,
    action: actionReducer
  },
});
