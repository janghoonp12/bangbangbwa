import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import AxiosHeaderToken from "./AxiosHeaderToken";

export const initialState = {
  writeItemLoading: false,
  writeItemDone: false,
  writeItemError: null,
  firstSearchItemLoading: false,
  firstSearchItemDone: false,
  firstSearchItemError: null,
  searchDetailItemLoading: false,
  searchDetailItemDone: false,
  searchDetailItemError: null,
  items: null,
  itemDetail: null,
  last: false,

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

export const firstSearchItemAsync = createAsyncThunk(
  'item/FIRSTSEARCH',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        '/items', data
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const searchDetailItemAsync = createAsyncThunk(
  'item/SEARCHDETAIL',
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


const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
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
    builder.addCase(firstSearchItemAsync.pending, (state, action) => {
      state.firstSearchItemLoading = true;
      state.firstSearchItemDone = null;
      state.firstSearchItemError = false;
    });
    builder.addCase(firstSearchItemAsync.fulfilled, (state, action) => {
      state.firstSearchItemLoading = false;
      state.firstSearchItemDone = true;
      state.items = action.payload.content;
    });
    builder.addCase(firstSearchItemAsync.rejected, (state, action) => {
      state.firstSearchItemLoading = false;
      state.firstSearchItemError = action.error
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

export const { clearWriteItemDone, clearSearchDetailItemDone } = itemSlice.actions;
export default itemSlice.reducer;