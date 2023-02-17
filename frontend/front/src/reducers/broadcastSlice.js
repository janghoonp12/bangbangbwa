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
  SearchMyBroadcastLoading: false,
  SearchMyBroadcastDone: false,
  SearchMyBroadcastError: null,
  writeBroadcastLoading: false,
  writeBroadcastDone: false,
  writeBroadcastError: null,
  deleteBroadcastLoading: false,
  deleteBroadcastDone: false,
  deleteBroadcastError: null,
  startBroadcastLoading: false,
  startBroadcastDone: false,
  startBroadcastError: null,
  liveBroadcast: null,
  endBroadcast: null,
  myBroadcast: null,
  watchingBroadCast: null,
  last: true,
  currentPage: 0,
};

export const SearchLiveBroadcastAsync = createAsyncThunk(
  'broadcast/SEARCH_LIVE_BROADCAST',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `/broadcasts/live?page=${data.page}&size=${data.size}`,
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const StartBroadcastAsync = createAsyncThunk(
  'broadcast/START_BROADCAST',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.post(
        `/broker/broadcasts/start/${data}`
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const SearchEndBroadcastAsync = createAsyncThunk(
  'broadcast/SEARCH_END_BOADCAST',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `/broadcasts/end?page=${data.page}&size=${data.size}`
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const searchMyBroadcastAsync = createAsyncThunk(
  'broadcast/SEARCH_MY_BROADCAST',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.get(
        'mypage/broadcast',
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const writeBroadcastAsync = createAsyncThunk(
  'broadcast/WRITE_BROADCAST',
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

export const findMyItemAsync = createAsyncThunk(
  'broadcast/FIND_MY_ITEM',
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

export const DeleteBroadcastAsync = createAsyncThunk(
  'item/DELETE_MY_BROADCAST',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.post(
        `/broker/broadcasts/deactive/${data}`,
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
    initBroadcastState: (state) => {
      state.currentPage = 0
      state.last = true
    },
    clearWriteBroadcastDone: (state) => {
      state.writeBroadcastDone = false
    },
    choiceWatchingBroadCast: (state, action) => {
      state.watchingBroadCast = action.payload
    },
    deleteMyBroadcast: (state, action) => {
      state.myBroadcast.map((item, index) => {

      })
    }
    
  },
  extraReducers: (builder) => {
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
    builder.addCase(SearchLiveBroadcastAsync.pending, (state, action) => {
      state.SearchLiveBroadcastLoading = true;
      state.SearchLiveBroadcastError = null;
      state.SearchLiveBroadcastDone = false;
    });
    builder.addCase(SearchLiveBroadcastAsync.fulfilled, (state, action) => {
      state.SearchLiveBroadcastLoading = false;
      state.SearchLiveBroadcastDone = true;
      state.liveBroadcast = action.payload.content;
      state.currentPage += 1;
      if (action.payload === "") {
        state.last = true
      } else {
        state.last = action.payload.last
      }
    });
    builder.addCase(SearchLiveBroadcastAsync.rejected, (state, action) => {
      state.SearchMyBroadcastLoading = false;
      state.SearchMyBroadcastError = action.error
    });
    builder.addCase(searchMyBroadcastAsync.pending, (state, action) => {
      state.SearchMyBroadcastLoading = true;
      state.SearchMyBroadcastError = null;
      state.SearchMyBroadcastDone = false;
    });
    builder.addCase(searchMyBroadcastAsync.fulfilled, (state, action) => {
      state.SearchMyBroadcastLoading = false;
      state.SearchMyBroadcastDone = true;
      state.myBroadcast = action.payload;
    });
    builder.addCase(searchMyBroadcastAsync.rejected, (state, action) => {
      state.SearchMyBroadcastLoading = false;
      state.SearchMyBroadcastError = action.error
    });
    builder.addCase(SearchEndBroadcastAsync.pending, (state, action) => {
      state.SearchEndBroadcastLoading = true;
      state.SearchEndBroadcastError = null;
      state.SearchEndBroadcastDone = false;
    });
    builder.addCase(SearchEndBroadcastAsync.fulfilled, (state, action) => {
      state.SearchEndBroadcastLoading = false;
      state.SearchEndBroadcastDone = true;
      state.endBroadcast = action.payload.content;
      state.currentPage += 1;
      if (action.payload === "") {
        state.last = true
      } else {
        state.last = action.payload.last
      }
    });
    builder.addCase(SearchEndBroadcastAsync.rejected, (state, action) => {
      state.SearchEndBroadcastLoading = false;
      state.SearchEndBroadcastError = action.error
    });
    builder.addCase(DeleteBroadcastAsync.pending, (state, action) => {
      state.deleteBroadcastLoading = true;
      state.deleteBroadcastDone = null;
      state.deleteBroadcastError = false;
    });
    builder.addCase(DeleteBroadcastAsync.fulfilled, (state, action) => {
      state.deleteBroadcastLoading = false;
      state.deleteBroadcastDone = true;
    });
    builder.addCase(DeleteBroadcastAsync.rejected, (state, action) => {
      state.deleteBroadcastLoading = false;
      state.deleteBroadcastError = action.error
    });

    builder.addCase(StartBroadcastAsync.pending, (state, action) => {
      state.startBroadcastLoading = true;
      state.startBroadcastDone = null;
      state.startBroadcastError = false;
    });
    builder.addCase(StartBroadcastAsync.fulfilled, (state, action) => {
      state.startBroadcastLoading = false;
      state.startBroadcastDone = true;
    });
    builder.addCase(StartBroadcastAsync.rejected, (state, action) => {
      state.startBroadcastLoading = false;
      state.startBroadcastError = action.error
    });

  }
});

export const { initBroadcastState, clearWriteBroadcastDone, choiceWatchingBroadCast, deleteMyBroadcast } = broadcastSlice.actions;
export default broadcastSlice.reducer;