import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import currencyService from "../../../services/currencyService";

const initialState = {
  currencies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isCreated: false,
  isUpdated: false,
  isDeleted: false,
  message: "",
};

//Get Currencies
export const getCurrencies = createAsyncThunk(
  "currency/getAll",
  async (_, thunkAPI) => {
    try {
      return await currencyService.getCurrencies();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Create new currency
export const createCurrency = createAsyncThunk(
  "/currency/create",
  async (currencyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await currencyService.createCurrency(currencyData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Update a currency
export const updateCurrency = createAsyncThunk(
  "/currency/update",
  async (currencyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const currencyId = currencyData._id;
      return await currencyService.updateCurrency(
        currencyData,
        token,
        currencyId
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete currency
export const deleteCurrency = createAsyncThunk(
  "/currency/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await currencyService.deleteCurrency(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCurrency.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCurrency.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isCreated = true;
        state.isUpdated = false;
        state.isDeleted = false;
        state.currencies.push(action.payload.currency);
      })
      .addCase(createCurrency.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.message = action.payload;
        if (action.payload === 'Not authorized') {
          localStorage.removeItem('user')
          window.location.replace('/home')
        }
      })

      .addCase(updateCurrency.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCurrency.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isCreated = false;
        state.isUpdated = true;
        state.isDeleted = false;
        let aux = [];
        // eslint-disable-next-line array-callback-return
        state.currencies.map((investment) => {
          if (investment._id === action.payload._id) {
            aux.push(action.payload);
          } else {
            aux.push(investment);
          }
        });
        state.currencies = aux
      })
      .addCase(updateCurrency.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.message = action.payload;
        if (action.payload === 'Not authorized') {
          localStorage.removeItem('user')
          window.location.replace('/home')
        }
      })

      .addCase(getCurrencies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrencies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.currencies = action.payload.currencies;
      })
      .addCase(getCurrencies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.message = action.payload;
        if (action.payload === 'Not authorized') {
          localStorage.removeItem('user')
          window.location.replace('/home')
        }
      })

      .addCase(deleteCurrency.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCurrency.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = true;
        state.currencies = state.currencies.filter(
          (c) => c._id !== action.payload.id
        );
      })
      .addCase(deleteCurrency.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.message = action.payload;
        if (action.payload === 'Not authorized') {
          localStorage.removeItem('user')
          window.location.replace('/home')
        }
      })
  },
});

export const { reset } = currencySlice.actions;
export default currencySlice.reducer;
