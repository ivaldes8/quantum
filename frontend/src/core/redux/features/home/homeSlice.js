import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import homeService from "../../../services/homeService";

const initialState = {
  home: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isCreated: false,
  isUpdated: false,
  isDeleted: false,
  message: "",
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
        state.isError = false;
        state.isCreated = false;
        state.isUpdated = true;
        state.isDeleted = false;
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
      .addCase(getHome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.home = action.payload.home;
      })
      .addCase(getHome.rejected, (state, action) => {
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

export const { reset } = homeSlice.actions;
export default homeSlice.reducer;
