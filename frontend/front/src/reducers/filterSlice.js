import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
  filterItemLoading: false,
  filterItemDone: false,
  filterItemError: null,
  filterBroadcastLoading: false,
  filterBroadcastDone: false,
  filterBroadcastError: null,
  filterItem: null, 
  filterBroadcast: null
};

export const FilterItemAsync = createAsyncThunk(
  'item/FILTER_SEARCH',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        '/items/filter', data
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const FilterBroadcastAsync = createAsyncThunk(
  'broadcast/FILTER_SEARCH',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        '/broadcasts/filter', data
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);


const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    initFilterState: (state) => {
      state.filterItem = null;
      state.filterBroadcast = null;
    },
    clearFilterItemDone: (state) => {
      state.filterItemDone = false
    },
    clearfilterBroadcastDone: (state) => {
      state.filterBroadcastDone = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(FilterItemAsync.pending, (state, action) => {
      state.filterItemLoading = true;
      state.filterItemDone = null;
      state.filterItemError = false;
    });
    builder.addCase(FilterItemAsync.fulfilled, (state, action) => {
      state.filterItemLoading = false;
      state.filterItemDone = true;
      state.filterItem = action.payload;
    });
    builder.addCase(FilterItemAsync.rejected, (state, action) => {
      state.filterItemLoading = false;
      state.filterItemError = action.error
    });
    builder.addCase(FilterBroadcastAsync.pending, (state, action) => {
      state.filterBroadcastLoading = true;
      state.filterBroadcastDone = null;
      state.filterItemError = false;
    });
    builder.addCase(FilterBroadcastAsync.fulfilled, (state, action) => {
      state.filterBroadcastLoading = false;
      state.filterBroadcastDone = true;
      state.filterBroadcast = action.payload;
    });
    builder.addCase(FilterBroadcastAsync.rejected, (state, action) => {
      state.filterBroadcastLoading = false;
      state.filterBroadcastError = action.error
    });
  }
});

export const { initFilterState, clearFilterItemDone, clearfilterBroadcastDone } = filterSlice.actions;
export default filterSlice.reducer;