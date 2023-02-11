import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import AxiosHeaderToken from "./AxiosHeaderToken";

export const initialState = {
  findMyItemLoading: false,
  findMyItemDone: false,
  findMyItemError: null,
  writeBroadcastLoading: false,
  writeBroadcastDone: false,
  writeBroadcastError: null,
  myItem: null,
};

export const findMyItemAsync = createAsyncThunk(
  'broadcast/FINDMYITEM',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.get(
        '/broker/mypage/item',
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const writeBroadcastAsync = createAsyncThunk(
  'broadcast/WRITEITEM',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.post(
        '/broker/broadcasts/new', data
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const broadcastSlice = createSlice({
  name: "broadcast",
  initialState,
  reducers: {
    clearWriteBroadcastDone: (state) => {
      state.writeBroadcastDone = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(findMyItemAsync.pending, (state, action) => {
      state.findMyItemLoading = true;
      state.findMyItemError = null;
      state.findMyItemDone = false;
    });
    builder.addCase(findMyItemAsync.fulfilled, (state, action) => {
      state.findMyItemLoading = false;
      state.findMyItemDone = true;
      state.myItem = action.payload
    });
    builder.addCase(findMyItemAsync.rejected, (state, action) => {
      state.findMyItemLoading = false;
      state.findMyItemError = action.error
    });
    builder.addCase(writeBroadcastAsync.pending, (state, action) => {
      state.writeBroadcastLoading = true;
      state.writeBroadcastError = null;
      state.writeBroadcastDone = false;
    });
    builder.addCase(writeBroadcastAsync.fulfilled, (state, action) => {
      state.writeBroadcastLoading = false;
      state.writeBroadcastDone = true;
    });
    builder.addCase(writeBroadcastAsync.rejected, (state, action) => {
      state.writeBroadcastLoading = false;
      state.writeBroadcastError = action.error
    });
  }
});

export const { clearWriteBroadcastDone } = broadcastSlice.actions;
export default broadcastSlice.reducer;