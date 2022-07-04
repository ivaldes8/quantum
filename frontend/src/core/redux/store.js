import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'
import userReducer from './features/user/userSlice'
import groupReducer from './features/groups/groupSlice'
import investmentReducer from './features/investments/investmentSlice'
import actionReducer from './features/actions/actionSlice'
import homeReducer from './features/home/homeSlice'
import homeCardReducer from './features/homeCards/homeCardSlice'
import currencyReducer from './features/currency/currencySlice'
import exchangeReducer from './features/exchange/exchangeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    group: groupReducer,
    investment: investmentReducer,
    action: actionReducer,
    home: homeReducer,
    homeCard: homeCardReducer,
    currency: currencyReducer,
    exchange: exchangeReducer
  },
});
