import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import homeCardService from "../../../services/homeCardsService";

const initialState = {
  homeCards: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isCreated: false,
  isUpdated: false,
  isDeleted: false,
  message: "",
};

//Get home cards
export const getHomeCards = createAsyncThunk(
  "homeCards/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await homeCardService.getHomeCards(token);
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

//Create new home card
export const createHomeCard = createAsyncThunk(
  "/homeCards/create",
  async (homeCardData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await homeCardService.createHomeCard(homeCardData, token);
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

//Update a home card
export const updateHomeCard = createAsyncThunk(
  "/homeCards/update",
  async (homeCardData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const homeCardId = homeCardData._id;
      return await homeCardService.updateHomeCard(
        homeCardData,
        token,
        homeCardId
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

//Delete homme card
export const deleteHomeCard = createAsyncThunk(
  "/homeCards/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await homeCardService.deleteHomeCard(id, token);
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

export const homeCardSlice = createSlice({
  name: "homeCard",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHomeCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createHomeCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isCreated = true;
        state.isUpdated = false;
        state.isDeleted = false;
        state.homeCards.push(action.payload.homeCard);
      })
      .addCase(createHomeCard.rejected, (state, action) => {
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
      .addCase(updateHomeCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateHomeCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isCreated = false;
        state.isUpdated = true;
        state.isDeleted = false;
        let aux = [];
        // eslint-disable-next-line array-callback-return
        state.homeCards.map((hc) => {
          if (hc._id === action.payload._id) {
            aux.push(action.payload);
          } else {
            aux.push(hc);
          }
        });
        state.homeCards = aux
      })
      .addCase(updateHomeCard.rejected, (state, action) => {
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
      .addCase(getHomeCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHomeCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.homeCards = action.payload.homeCards;
      })
      .addCase(getHomeCards.rejected, (state, action) => {
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

      .addCase(deleteHomeCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteHomeCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = true;
        state.homeCards = state.homeCards.filter(
          (hc) => hc._id !== action.payload.id
        );
      })
      .addCase(deleteHomeCard.rejected, (state, action) => {
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
      });
  },
});

export const { reset } = homeCardSlice.actions;
export default homeCardSlice.reducer;
