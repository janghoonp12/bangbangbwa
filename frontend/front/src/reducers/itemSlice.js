import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import AxiosHeaderToken from "./AxiosHeaderToken";

export const initialState = {
  writeItemLoading: false,
  writeItemDone: false,
  writeItemError: null,

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


const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
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
      alert('공지사항 작성 성공')
    });
    builder.addCase(writeItemAsync.rejected, (state, action) => {
      state.writeItemLoading = false;
      state.writeItemError = action.payload
      alert('공지사항 작성 실패');
    });

  }
});

export default noticeSlice.reducer;