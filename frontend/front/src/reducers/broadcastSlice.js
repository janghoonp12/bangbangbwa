import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import AxiosHeaderToken from "./AxiosHeaderToken";

export const initialState = {
  findMyItemLoading: false,
  findMyItemDone: false,
  findMyItemError: null,
  SearchLiveBroadcastLoading: false,
  SearchLiveBroadcastDone: false,
  SearchLiveBroadcastError: null,
  SearchEndBroadcastLoading: false,
  SearchEndBroadcastDone: false,
  SearchEndBroadcastError: null,
  writeBroadcastLoading: false,
  writeBroadcastDone: false,
  writeBroadcastError: null,
  myItem: null,
  liveBroadcast: null,
  endBroadcast: null,
  watchingBroadCast: null,
};

export const firstSearchLiveBroadcastAsync = createAsyncThunk(
  'broadcast/SEARCHLIVEBROADCAST',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        '/broadcasts/live', {page: 0, size: 12}
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const firstSearchEndBroadcastAsync = createAsyncThunk(
  'broadcast/SEARCHENDBOADCAST',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        '/broadcasts/end', {page: 0, size: 12}
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

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
    },
    choiceWatchingBroadCast: (state, action) => {
      state.watchingBroadCast = action.payload
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
    builder.addCase(firstSearchLiveBroadcastAsync.pending, (state, action) => {
      state.SearchLiveBroadcastLoading = true;
      state.SearchLiveBroadcastError = null;
      state.SearchLiveBroadcastDone = false;
    });
    builder.addCase(firstSearchLiveBroadcastAsync.fulfilled, (state, action) => {
      state.SearchLiveBroadcastLoading = false;
      state.SearchLiveBroadcastDone = true;
      state.liveBroadcast = action.payload.content;
    });
    builder.addCase(firstSearchLiveBroadcastAsync.rejected, (state, action) => {
      state.SearchLiveBroadcastLoading = false;
      state.SearchLiveBroadcastError = action.error
    });
    builder.addCase(firstSearchEndBroadcastAsync.pending, (state, action) => {
      state.SearchEndBroadcastLoading = true;
      state.SearchEndBroadcastError = null;
      state.SearchEndBroadcastDone = false;
    });
    builder.addCase(firstSearchEndBroadcastAsync.fulfilled, (state, action) => {
      state.SearchEndBroadcastLoading = false;
      state.SearchEndBroadcastDone = true;
      state.endBroadcast = action.payload.content;
    });
    builder.addCase(firstSearchEndBroadcastAsync.rejected, (state, action) => {
      state.SearchEndBroadcastLoading = false;
      state.SearchEndBroadcastError = action.error
    });
  }
});

export const { clearWriteBroadcastDone, choiceWatchingBroadCast } = broadcastSlice.actions;
export default broadcastSlice.reducer;