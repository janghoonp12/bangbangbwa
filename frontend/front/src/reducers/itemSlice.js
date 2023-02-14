import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import AxiosHeaderToken from "./AxiosHeaderToken";

export const initialState = {
  writeItemLoading: false,
  writeItemDone: false,
  writeItemError: null,
  searchItemLoading: false,
  searchItemDone: false,
  searchItemError: null,
  searchDetailItemLoading: false,
  searchDetailItemDone: false,
  searchDetailItemError: null,
  searchMyItemLoading: false,
  searchMyItemDone: false,
  searchMyItemError: null,
  myItem: null,
  items: null,
  itemDetail: null,
  last: false,
  currentPage: 0,

};

export const writeItemAsync = createAsyncThunk(
  'item/WRITE',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.post(
        '/broker/items/new', data
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const SearchItemAsync = createAsyncThunk(
  'item/NEXT_SEARCH_ITEM',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `/items?page=${data.page}&size=${data.size}`, data
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const searchDetailItemAsync = createAsyncThunk(
  'item/SEARCH_DETAIL',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `/items/${data}`,
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const searchMyItemAsync = createAsyncThunk(
  'broadcast/FIND_MY_ITEM',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.get(
        '/mypage/item',
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);


const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    initItemState: (state) => {
      state.items = null;
      state.currentPage = 0;
      state.last = false;
      state.itemDetail = null;
    },
    clearSearchDetailItemDone: (state) => {
      state.searchDetailItemDone = false
    },
    clearWriteItemDone: (state) => {
      state.writeItemDone = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(writeItemAsync.pending, (state, action) => {
      state.writeItemLoading = true;
      state.writeItemError = null;
      state.writeItemDone = false;
    });
    builder.addCase(writeItemAsync.fulfilled, (state, action) => {
      state.writeItemLoading = false;
      state.writeItemDone = true;
      alert('매물 등록 성공')
    });
    builder.addCase(writeItemAsync.rejected, (state, action) => {
      state.writeItemLoading = false;
      state.writeItemError = action.payload
      alert('매물 등록 실패');
    });
    builder.addCase(searchMyItemAsync.pending, (state, action) => {
      state.searchMyItemLoading = true;
      state.searchMyItemError = null;
      state.searchMyItemDone = false;
    });
    builder.addCase(searchMyItemAsync.fulfilled, (state, action) => {
      state.searchMyItemLoading = false;
      state.searchMyItemDone = true;
      console.log(action.payload)
      state.myItem = action.payload
    });
    builder.addCase(searchMyItemAsync.rejected, (state, action) => {
      state.searchMyItemLoading = false;
      state.searchMyItemError = action.error
    });
    builder.addCase(SearchItemAsync.pending, (state, action) => {
      state.searchItemLoading = true;
      state.searchItemDone = null;
      state.searchItemError = false;
    });
    builder.addCase(SearchItemAsync.fulfilled, (state, action) => {
      state.searchItemLoading = false;
      state.searchItemDone = true;
      if (state.items === null) {
        state.items = action.payload.content;
      } else {
        state.items = state.items.concat(action.payload.content)
      }
      state.currentPage += 1;
      state.last = action.payload.last
    });
    builder.addCase(SearchItemAsync.rejected, (state, action) => {
      state.searchItemLoading = false;
      state.searchItemError = action.error
    });
    builder.addCase(searchDetailItemAsync.pending, (state, action) => {
      state.searchDetailItemLoading = true;
      state.searchDetailItemDone = null;
      state.searchDetailItemError = false;
    });
    builder.addCase(searchDetailItemAsync.fulfilled, (state, action) => {
      state.searchDetailItemLoading = false;
      state.searchDetailItemDone = true;
      state.itemDetail = action.payload;
    });
    builder.addCase(searchDetailItemAsync.rejected, (state, action) => {
      state.searchDetailItemLoading = false;
      state.searchDetailItemError = action.error
    });
  }
});

export const { initItemState, clearWriteItemDone, clearSearchDetailItemDone } = itemSlice.actions;
export default itemSlice.reducer;