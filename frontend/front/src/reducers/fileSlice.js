import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import AxiosHeaderToken from "./AxiosHeaderToken";

export const initialState = {
  images: [],
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: false,
};
export const fileUploadAsync = createAsyncThunk(
  'user/FILE_UPLOAD',
  async (data, thunkAPI) => {
    try {
      const config = {
        "content-type": "multipart/form-data",
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

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fileUploadAsync.pending, (state, action) => {
      state.uploadImagesLoading = true;
      state.uploadImagesError = null;
      state.uploadImagesDone = false;
    });
    builder.addCase(fileUploadAsync.fulfilled, (state, action) => {
      state.uploadImagesLoading = false;
      state.uploadImagesDone = true;
      state.images = state.images.concat(action.payload);
      alert('파일 업로드 성공')
    });
    builder.addCase(fileUploadAsync.rejected, (state, action) => {
      state.uploadImagesLoading = false;
      state.uploadImagesError = action.error
      alert('파일 업로드 실패');
    });
  }
});

export const {  } = fileSlice.actions;

export default fileSlice.reducer;