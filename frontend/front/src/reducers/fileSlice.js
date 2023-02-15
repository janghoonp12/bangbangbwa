import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import AxiosHeaderToken from "./AxiosHeaderToken";

export const initialState = {
  images: null,
  noticeUploadImagesLoading: false,
  noticeUploadImagesDone: false,
  noticeUploadImagesError: false,
  broadcastUploadImagesLoading: false,
  broadcastUploadImagesDone: false,
  broadcastUploadImagesError: false,
  broadcastGetImagesLoading: false,
  broadcastGetImagesDone: false,
  broadcastGetImagesError: false,
  noticeGetImagesLoading: false,
  noticeGetImagesDone: false,
  noticeGetImagesError: false,
};

export const noticeFileUploadAsync = createAsyncThunk(
  'file/FILE_NOTICE_UPLOAD',
  async (data, thunkAPI) => {
    try {
      const config = {
        "Content-Type": "multipart/form-data",
      }
      const response = await AxiosHeaderToken.post(
        '/admin/images',
        data,
        config
      );
 
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const broadcastFileUploadAsync = createAsyncThunk(
  'file/FILE_BROADCAST_UPLOAD',
  async (data, thunkAPI) => {
    try {
      const config = {
        "Content-Type": "multipart/form-data",
      }
      const response = await AxiosHeaderToken.post(
        '/broker/images/new',
        data,
        config
      );
 
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const noticeGetFileAsync = createAsyncThunk(
  'file/FILE_NOTICE_GET',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.get(
        `/images/${data}`,
      );
 
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const broadcastGetFileAsync = createAsyncThunk(
  'file/FILE_BROADCAST_GET',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.get(
        `/images/${data}`,
      );
 
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);


const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    clearNoticeGetImagesDone: (state) => {
      state.noticeGetImagesDone = false
      console.log(state.noticeGetImagesDone)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(noticeFileUploadAsync.pending, (state, action) => {
      state.noticeUploadImagesLoading = true;
      state.noticeUploadImagesError = null;
      state.noticeUploadImagesDone = false;
    });
    builder.addCase(noticeFileUploadAsync.fulfilled, (state, action) => {
      state.noticeUploadImagesLoading = false;
      state.noticeUploadImagesDone = true;
      console.log(action.payload);
      state.images = action.payload;
    });
    builder.addCase(noticeFileUploadAsync.rejected, (state, action) => {
      state.noticeUploadImagesLoading = false;
      state.noticeUploadImagesError = action.error
      alert('공지사항 파일 업로드 실패');
    });

    builder.addCase(broadcastFileUploadAsync.pending, (state, action) => {
      state.broadcastUploadImagesLoading = true;
      state.broadcastUploadImagesError = null;
      state.broadcastUploadImagesDone = false;
    });
    builder.addCase(broadcastFileUploadAsync.fulfilled, (state, action) => {
      state.broadcastUploadImagesLoading = false;
      state.broadcastUploadImagesDone = true;
      state.images = action.payload;
    });
    builder.addCase(broadcastFileUploadAsync.rejected, (state, action) => {
      state.broadcastUploadImagesLoading = false;
      state.broadcastUploadImagesError = action.error
      alert('방송 파일 업로드 실패');
    });

    builder.addCase(broadcastGetFileAsync.pending, (state, action) => {
      state.broadcastGetImagesLoading = true;
      state.broadcastGetImagesError = null;
      state.broadcastGetImagesDone = false;
    });
    builder.addCase(broadcastGetFileAsync.fulfilled, (state, action) => {
      state.broadcastGetImagesLoading = false;
      state.broadcastGetImagesDone = true;
      state.images = action.payload;
    });
    builder.addCase(broadcastGetFileAsync.rejected, (state, action) => {
      state.broadcastGetImagesLoading = false;
      state.broadcastGetImagesError = action.error
      alert('방송 파일 불러오기 실패');
    });

    builder.addCase(noticeGetFileAsync.pending, (state, action) => {
      state.noticeGetImagesLoading = true;
      state.noticeGetImagesError = null;
      state.noticeGetImagesDone = false;
    });
    builder.addCase(noticeGetFileAsync.fulfilled, (state, action) => {
      state.noticeGetImagesLoading = false;
      state.noticeGetImagesDone = true;
      state.images = action.payload;
    });
    builder.addCase(noticeGetFileAsync.rejected, (state, action) => {
      state.noticeGetImagesLoading = false;
      state.noticeGetImagesError = action.error
      alert('공지사항 파일 불러오기 실패');
    });
  }
});

export const { clearNoticeGetImagesDone } = fileSlice.actions;

export default fileSlice.reducer;