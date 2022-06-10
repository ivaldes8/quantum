import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import homeService from "../../../services/homeService";

const initialState = {
  home: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const getDeposit = (actions) => {
  let amount = 0;
  actions.map((a) => {
      amount += a.amount;
    })
  return amount;
};

const getFeedBack = (actions) => {
  let feedBack = 0;
  actions.map((a) => {
      feedBack += a.feedback;
    })
  return feedBack;
};


//Get home
export const getHome = createAsyncThunk(
  "home/getAll",
  async (_, thunkAPI) => {
    try {
      return await homeService.getHome();
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

//Update a home
export const updateHome = createAsyncThunk(
  "/home/update",
  async (homeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const homeId = homeData._id;
      return await homeService.updateHome(
        homeData,
        token,
        homeId
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

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateHome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateHome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        let aux = [];
        // eslint-disable-next-line array-callback-return
        state.home.map((h) => {
          if (h._id === action.payload._id) {
            aux.push(action.payload);
          } else {
            aux.push(h);
          }
        });
        state.home = aux
      })
      .addCase(updateHome.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getHome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.home = action.payload.home;
      })
      .addCase(getHome.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = homeSlice.actions;
export default homeSlice.reducer;
