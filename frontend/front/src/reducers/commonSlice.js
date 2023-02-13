import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const initialState = {
  myPageStatus: 1,
};

const commonSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    changeMyPageStatus: (state, action) => {
      state.myPageStatus = action.payload
    }
  },
  extraReducers: (builder) => {
  }
});

export const { changeMyPageStatus } = commonSlice.actions;

export default commonSlice.reducer;