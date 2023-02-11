import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import AxiosHeaderToken from "./AxiosHeaderToken";

export const initialState = {
  searchAllNoticeLoading: false,
  searchAllNoticeDone: false,
  searchAllNoticeError: null,
  searchDetailNoticeLoading: false,
  searchDetailNoticeDone: false,
  searchDetailNoticeError: null,
  writeNoticeLoading: false,
  writeNoticeDone: false,
  writeNoticeError: null,
  modifyNoticeLoading: false,
  modifyNoticeDone: false,
  modifyNoticeError: null,
  deleteNoticeLoading: false,
  deleteNoticeDone: false,
  deleteNoticeError: null,
  noticeData: null,
  noticeDetail: null
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

export const searchDetailNoticeAsync = createAsyncThunk(
  'notice/SEARCH_DETAIL',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `/notices/${data}`,
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
      console.log(data)
      const response = await AxiosHeaderToken.post(
        '/admin/notices/new', data
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const modifyNoticeAsync = createAsyncThunk(
  'notice/MODIFY',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.patch(
        '/admin/notices/modify', data
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteNoticeAsync = createAsyncThunk(
  'notice/DELETE',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.delete(
        `/admin/notices/${data.notice_id}`
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
    clearSearchDetailNoticeDone: (state) => {
      state.searchDetailNoticeDone = false
    },
    clearWriteNoticeDone: (state) => {
      state.writeNoticeDone = false
    },
    clearModifyNoticeDone: (state) => {
      state.modifyNoticeDone = false
    },
    clearDeleteNoticeDone: (state) => {
      state.deleteNoticeDone = false
    },
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
      state.noticeData = action.payload.content
    });
    builder.addCase(searchAllNoticeAsync.rejected, (state, action) => {
      state.searchAllNoticeLoading = false;
      state.searchAllNoticeError = action.payload
      alert('공지사항 검색 실패');
    });
    builder.addCase(searchDetailNoticeAsync.pending, (state, action) => {
      state.searchDetailNoticeLoading = true;
      state.searchDetailNoticeError = null;
      state.searchDetailNoticeDone = false;
    });
    builder.addCase(searchDetailNoticeAsync.fulfilled, (state, action) => {
      state.searchDetailNoticeLoading = false;
      state.searchDetailNoticeDone = true;
      state.noticeDetail = action.payload
    });
    builder.addCase(searchDetailNoticeAsync.rejected, (state, action) => {
      state.searchDetailNoticeLoading = false;
      state.searchDetailNoticeError = action.payload
      alert('공지사항 보기 실패');
    });
    builder.addCase(writeNoticeAsync.pending, (state, action) => {
      state.writeNoticeLoading = true;
      state.writeNoticeError = null;
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
    builder.addCase(modifyNoticeAsync.pending, (state, action) => {
      state.modifyNoticeLoading = true;
      state.modifyNoticeError = null;
      state.modifyNoticeDone = false;
    });
    builder.addCase(modifyNoticeAsync.fulfilled, (state, action) => {
      state.modifyNoticeLoading = false;
      state.modifyNoticeDone = true;
      alert('공지사항 수정 성공')
    });
    builder.addCase(modifyNoticeAsync.rejected, (state, action) => {
      state.modifyNoticeLoading = false;
      state.modifyNoticeError = action.error
      alert('공지사항 수정 실패');
    });
    builder.addCase(deleteNoticeAsync.pending, (state, action) => {
      state.deleteNoticeLoading = true;
      state.deleteNoticeError = null;
      state.deleteNoticeDone = false;
    });
    builder.addCase(deleteNoticeAsync.fulfilled, (state, action) => {
      state.deleteNoticeLoading = false;
      state.deleteNoticeDone = true;
      alert('공지사항 삭제 성공')
    });
    builder.addCase(deleteNoticeAsync.rejected, (state, action) => {
      state.deleteNoticeLoading = false;
      state.deleteNoticeError = action.error
      alert('공지사항 삭제 실패');
    });

  }
});

export const { clearSearchDetailNoticeDone, clearWriteNoticeDone, clearModifyNoticeDone, clearDeleteNoticeDone  } = noticeSlice.actions;

export default noticeSlice.reducer;