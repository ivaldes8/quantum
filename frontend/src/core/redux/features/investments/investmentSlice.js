import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import investmentService from "../../../services/investmentService";

const initialState = {
  investments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get user investments
export const getInvestments = createAsyncThunk(
  "investments/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await investmentService.getInvestments(token);
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

//Create new investment
export const createInvestment = createAsyncThunk(
  "/investments/create",
  async (investmentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await investmentService.createInvestment(investmentData, token);
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

//Update a investment
export const updateInvestment = createAsyncThunk(
  "/investments/update",
  async (investmentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const investmentId = investmentData._id;
      return await investmentService.updateInvestment(
        investmentData,
        token,
        investmentId
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

//Delete user investment
export const deleteInvestment = createAsyncThunk(
  "/investments/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await investmentService.deleteInvestment(id, token);
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

export const investmentSlice = createSlice({
  name: "investment",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInvestment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInvestment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.investments.push(action.payload.investment);
      })
      .addCase(createInvestment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        if (action.payload === 'Not authorized') {
          localStorage.removeItem('user')
          window.location.replace('/home')
        }
      })
      .addCase(updateInvestment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateInvestment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        let aux = [];
        // eslint-disable-next-line array-callback-return
        state.investments.map((investment) => {
          if (investment._id === action.payload._id) {
            aux.push(action.payload);
          } else {
            aux.push(investment);
          }
        });
        state.investments = aux
      })
      .addCase(updateInvestment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        if (action.payload === 'Not authorized') {
          localStorage.removeItem('user')
          window.location.replace('/home')
        }
      })
      .addCase(getInvestments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvestments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.investments = action.payload.investments;
      })
      .addCase(getInvestments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        if (action.payload === 'Not authorized') {
          localStorage.removeItem('user')
          window.location.replace('/home')
        }
      })

      .addCase(deleteInvestment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteInvestment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.investments = state.investments.filter(
          (i) => i._id !== action.payload.id
        );
      })
      .addCase(deleteInvestment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        if (action.payload === 'Not authorized') {
          localStorage.removeItem('user')
          window.location.replace('/home')
        }
      });
  },
});

export const { reset } = investmentSlice.actions;
export default investmentSlice.reducer;
