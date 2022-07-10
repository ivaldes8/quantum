import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import exchangeService from "../../../services/exchangeService";

const initialState = {
  exchanges: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isCreated: false,
  isUpdated: false,
  isDeleted: false,
  message: "",
};

//Get Exchanges
export const getExchanges = createAsyncThunk(
  "exchange/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await exchangeService.getExchanges(token);
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

//Create new exchange
export const createExchange = createAsyncThunk(
  "/exchange/create",
  async (exchangeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await exchangeService.createExchange(exchangeData, token);
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

//Update a exchange
export const updateExchange = createAsyncThunk(
  "/exchange/update",
  async (exchangeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const exchangeId = exchangeData._id;
      return await exchangeService.updateExchange(
        exchangeData,
        token,
        exchangeId
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

//Delete exchange
export const deleteExchange = createAsyncThunk(
  "/exchange/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await exchangeService.deleteExchange(id, token);
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

export const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createExchange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExchange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isCreated = true;
        state.isUpdated = false;
        state.isDeleted = false;
        state.exchanges.push(action.payload.exchange);
      })
      .addCase(createExchange.rejected, (state, action) => {
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

      .addCase(updateExchange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateExchange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isCreated = false;
        state.isUpdated = true;
        state.isDeleted = false;
        let aux = [];
        // eslint-disable-next-line array-callback-return
        state.exchanges.map((exchange) => {
          if (exchange._id === action.payload._id) {
            aux.push(action.payload);
          } else {
            aux.push(exchange);
          }
        });
        state.exchanges = aux
      })
      .addCase(updateExchange.rejected, (state, action) => {
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

      .addCase(getExchanges.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExchanges.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.exchanges = action.payload.exchanges;
      })
      .addCase(getExchanges.rejected, (state, action) => {
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

      .addCase(deleteExchange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExchange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = true;
        state.exchanges = state.exchanges.filter(
          (c) => c._id !== action.payload.id
        );
      })
      .addCase(deleteExchange.rejected, (state, action) => {
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

export const { reset } = exchangeSlice.actions;
export default exchangeSlice.reducer;
