import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
  searchAllNoticeLoading: false,
  searchAllNoticeDone: false,
  searchAllNoticeError: null,
  noticeData: null
};

export const searchAllNoticeAsync = createAsyncThunk(
  'notice/SEARCH_ALL',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        '/notices',
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);


const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(searchAllNoticeAsync.pending, (state, action) => {
      state.searchAllNoticeLoading = true;
      state.searchAllNoticeError = null;
      state.searchAllNoticeDone = false;
    });
    builder.addCase(searchAllNoticeAsync.fulfilled, (state, action) => {
      state.searchAllNoticeLoading = false;
      state.searchAllNoticeDone = true;
      state.noticeData = action.payload
    });
    builder.addCase(searchAllNoticeAsync.rejected, (state, action) => {
      state.searchAllNoticeLoading = false;
      state.searchAllNoticeError = action.data
      alert('공지사항 검색 실패');
    });

  }
});

export default noticeSlice.reducer;