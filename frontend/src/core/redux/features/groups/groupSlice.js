import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import groupService from "../../../services/groupService";

const initialState = {
  groups: [],
  currentGroup: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isCreated: false,
  isUpdated: false,
  isDeleted: false,
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

//Get user groups
export const getGroups = createAsyncThunk(
  "groups/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.getGroups(token);
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

//Get user group
export const getGroup = createAsyncThunk(
  "groups/get",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.getGroup(token, id);
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

//Create new group
export const createGroup = createAsyncThunk(
  "/groups/create",
  async (groupData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.createGroup(groupData, token);
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

//Update a group
export const updateGroup = createAsyncThunk(
  "/groups/update",
  async (groupData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const groupId = groupData._id;
      return await groupService.updateGroup(
        groupData,
        token,
        groupId
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

//Delete user group
export const deleteGroup = createAsyncThunk(
  "/groups/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.deleteGroup(id, token);
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

export const groupSlice = createSlice({
  name: "group",
  initialState,
  getDeposit,
  getFeedBack,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isCreated = true;
        state.isUpdated = false;
        state.isDeleted = false;
        state.groups.push(action.payload.group);
      })
      .addCase(createGroup.rejected, (state, action) => {
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
      .addCase(updateGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isCreated = false;
        state.isUpdated = true;
        state.isDeleted = false;
        let aux = [];
        // eslint-disable-next-line array-callback-return
        state.groups.map((group) => {
          if (group._id === action.payload._id) {
            aux.push(action.payload);
          } else {
            aux.push(group);
          }
        });
        state.groups = aux
      })
      .addCase(updateGroup.rejected, (state, action) => {
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
      .addCase(getGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;
        state.groups = action.payload.groups;
      })
      .addCase(getGroups.rejected, (state, action) => {
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

      .addCase(getGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = false;

        let auxArr = []
        action.payload.group[0].investments.map((i) => {
          i = { ...i, deposit: getDeposit(i.actions), feedback: getFeedBack(i.actions) }
          auxArr.push(i)
        })
        state.currentGroup = auxArr
      })
      .addCase(getGroup.rejected, (state, action) => {
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

      .addCase(deleteGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isCreated = false;
        state.isUpdated = false;
        state.isDeleted = true;
        state.groups = state.groups.filter(
          (g) => g._id !== action.payload.id
        );
      })
      .addCase(deleteGroup.rejected, (state, action) => {
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

export const { reset } = groupSlice.actions;
export default groupSlice.reducer;
