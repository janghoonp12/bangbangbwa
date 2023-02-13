import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import AxiosHeaderToken from "./AxiosHeaderToken";

export const initialState = {
  writeBookmarkLoading: false,
  writeBookmarkDone: false,
  writeBookmarkError: null,
  firstSearchBookmarkLoading: false,
  firstSearchBookmarkDone: false,
  firstSearchBookmarkError: null,
  Bookmarks: null,
  last: false,

};

export const writeBookmarkAsync = createAsyncThunk(
  'Bookmark/WRITE',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.post(
        '/user/bookmarks/new', data
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const firstSearchBookmarkAsync = createAsyncThunk(
  'Bookmark/FIRSTSEARCH',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        '/user/bookmarks', data
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);



const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    clearWriteBookmarkDone: (state) => {
      state.writeBookmarkDone = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(writeBookmarkAsync.pending, (state, action) => {
      state.writeBookmarkLoading = true;
      state.writeBookmarkError = null;
      state.writeBookmarkDone = false;
    });
    builder.addCase(writeBookmarkAsync.fulfilled, (state, action) => {
      state.writeBookmarkLoading = false;
      state.writeBookmarkDone = true;
      alert('매물 등록 성공')
    });
    builder.addCase(writeBookmarkAsync.rejected, (state, action) => {
      state.writeBookmarkLoading = false;
      state.writeBookmarkError = action.payload
      alert('매물 등록 실패');
    });
    builder.addCase(firstSearchBookmarkAsync.pending, (state, action) => {
      state.firstSearchBookmarkLoading = true;
      state.firstSearchBookmarkDone = null;
      state.firstSearchBookmarkError = false;
    });
    builder.addCase(firstSearchBookmarkAsync.fulfilled, (state, action) => {
      state.firstSearchBookmarkLoading = false;
      state.firstSearchBookmarkDone = true;
      state.Bookmarks = action.payload.content;
      console.log(action.payload.content)
    });
    builder.addCase(firstSearchBookmarkAsync.rejected, (state, action) => {
      state.firstSearchBookmarkLoading = false;
      state.firstSearchBookmarkError = action.error
    });
  }
});

export const { clearWriteBookmarkDone, clearSearchDetailBookmarkDone } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;