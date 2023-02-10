import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import AxiosHeaderToken from "./AxiosHeaderToken";

export const initialState = {
  searchAllNoticeLoading: false,
  searchAllNoticeDone: false,
  searchAllNoticeError: null,
  writeNoticeLoading: false,
  writeNoticeDone: false,
  writeNoticeError: null,
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

export const writeNoticeAsync = createAsyncThunk(
  'notice/WRITE',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.post(
        '/admin/notices/new', data
      );
      console.log(response, "asdasd")
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
      state.searchAllNoticeError = action.payload
      alert('공지사항 검색 실패');
    });
    builder.addCase(writeNoticeAsync.pending, (state, action) => {
      state.writeNoticeLoading = true;
      state.writeNoticeError = null;
      state.writeNoticeDone = false;
    });
    builder.addCase(writeNoticeAsync.fulfilled, (state, action) => {
      state.writeNoticeLoading = false;
      state.writeNoticeDone = true;
      alert('공지사항 작성 성공')
    });
    builder.addCase(writeNoticeAsync.rejected, (state, action) => {
      state.writeNoticeLoading = false;
      state.writeNoticeError = action.payload
      alert('공지사항 작성 실패');
    });

  }
});

export default noticeSlice.reducer;