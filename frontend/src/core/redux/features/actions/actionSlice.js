import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import actionService from "../../../services/actionService";

const initialState = {
  actions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isCreated: false,
  isUpdated: false,
  isDeleted: false,
  message: "",
};

//Get user actions
export const getActions = createAsyncThunk(
  "actions/getAll",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await actionService.getActions(id, token);
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

//Create new action
export const createAction = createAsyncThunk(
  "/actions/create",
  async (actionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const toSend = {
        amount: actionData.amount,
        feedback: actionData.feedback,
        reason: actionData.reason,
        date: actionData.date
      }
      const id = actionData.id;
      return await actionService.createAction(toSend, id, token);
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

//Update a action
export const updateAction = createAsyncThunk(
  "/actions/update",
  async (actionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const actionId = actionData._id;
      return await actionService.updateAction(
        actionData,
        token,
        actionId
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

//Delete user action
export const deleteAction = createAsyncThunk(
  "/actions/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await actionService.deleteAction(id, token);
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

export const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isCreated = true;
        state.isUpdated = false;
        state.isDeleted = false;
        state.actions.push(action.payload.action);
      })
      .addCase(createAction.rejected, (state, action) => {
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
      .addCase(updateAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isCreated = false;
        state.isUpdated = true;
        state.isDeleted = false;
        let aux = [];
        // eslint-disable-next-line array-callback-return
        state.actions.map((a) => {
          if (a._id === action.payload._id) {
            aux.push(action.payload);
          } else {
            aux.push(a);
          }
        });
        state.actions = aux
      })
      .addCase(updateAction.rejected, (state, action) => {
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
      .addCase(getActions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.actions = action.payload.actions;
      })
      .addCase(getActions.rejected, (state, action) => {
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

      .addCase(deleteAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = true;
        state.actions = state.actions.filter(
          (i) => i._id !== action.payload.id
        );
      })
      .addCase(deleteAction.rejected, (state, action) => {
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

export const { reset } = actionSlice.actions;
export default actionSlice.reducer;
