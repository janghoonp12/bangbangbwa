import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import AxiosHeaderToken from "./AxiosHeaderToken";

export const initialState = {
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  signInLoading: false,
  signInDone: false,
  signInError: null,
  oauth2SignInLoading: false,
  oauth2SignInDone: false,
  oauth2SignInError: null,
  searchMyInfoLoading: false,
  searchMyInfoDone: false,
  searchMyInfoError: null,
  me: null,
  userInfo : null
};

export const signUpAsync = createAsyncThunk(
  'user/SIGN_UP',
  async (data, thunkAPI) => {
    try {
      console.log(data)
      const response = await axios.post(
        '/users/new',
        data
      );
 
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const signInAsync = createAsyncThunk(
  'user/SIGN_IN',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        '/users/auth',
        data
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const oauth2SignInAsync = createAsyncThunk(
  'user/OAUTH_SIGN_IN',
  async (data, thunkAPI) => {
    try {
      return data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const searchMyInfoAsync = createAsyncThunk(
  'user/LOAD_MY_INFO',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.get(
        '/user/mypage'
      );

      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearSignUpDone: (state) => {
      state.signUpDone = false
    },
    clearSearchMyInfoDone: (state) => {
      state.searchMyInfoDone = false
    },
    // addNumber: (state, action) => {
    //   state.number = state.number + action.payload;
    // },

    // minusNumber: (state, action) => {
    //   state.number = state.number - action.payload;
    // },
    // signIn: (state, action) => {
    //   state.me = action.payload;
    //   state.signInDone = true;
    // },
    // signUp: (state, action) => {
    //   state.signUpDone = true;
    // }
  },
  extraReducers: (builder) => {
    // builder는 Case Reducer로 액션별로 나눠서 액션을 처리할 수 있음.
    // extraReducer를 사용한 이유는 맵핑된 내부 액션 타입이 아니라 외부 액션을 참조하려는 것임.
 
    // 회원가입
    builder.addCase(signUpAsync.pending, (state, action) => {
      state.signUpLoading = true;
      state.signUpError = null;
      state.signUpDone = false;
    });
    builder.addCase(signUpAsync.fulfilled, (state, action) => {
      state.signUpLoading = false;
      state.signUpDone = true;
    });
    builder.addCase(signUpAsync.rejected, (state, action) => {
      state.signUpLoading = false;
      state.signUpError = action.data
      alert('회원가입에 실패했습니다.');
    });
    builder.addCase(signInAsync.pending, (state, action) => {
      state.signInLoading = true;
      state.signInError = null;
      state.signInDone = false;
    });
    builder.addCase(signInAsync.fulfilled, (state, action) => {
      state.signInLoading = false;
      state.me = {
        email : action.payload.email,
        nickname: action.payload.nickname,
        role : action.payload.role
      }
      sessionStorage.clear()
      sessionStorage.setItem("access-token", action.payload.accesstoken)
      sessionStorage.setItem("refresh-token", action.payload.refreshtoken)
      alert('로그인에 성공하였습니다.');
      state.signInDone = true;
    });
    builder.addCase(signInAsync.rejected, (state, action) => {
      state.signInLoading = false;
      state.signInError = action.error
      alert('로그인에 실패했습니다.');
    });
    builder.addCase(oauth2SignInAsync.pending, (state, action) => {
      state.signInLoading = true;
      state.signInError = null;
      state.signInDone = false;
    });
    builder.addCase(oauth2SignInAsync.fulfilled, (state, action) => {
      state.signInLoading = false;
      state.me = {
        email : action.payload.email,
        nickname: action.payload.nickname,
        role : action.payload.role
      }
      sessionStorage.clear()
      sessionStorage.setItem("access-token", action.payload.accesstoken)
      sessionStorage.setItem("refresh-token", action.payload.refreshtoken)
      state.signInDone = true;
    });
    builder.addCase(oauth2SignInAsync.rejected, (state, action) => {
      state.signInLoading = false;
      state.signInError = action.payload
      alert('로그인에 실패했습니다.');
    });
    builder.addCase(searchMyInfoAsync.pending, (state, action) => {
      state.searchMyInfoLoading = true;
      state.searchMyInfoError = null;
      state.searchMyInfoDone = false;
    });
    builder.addCase(searchMyInfoAsync.fulfilled, (state, action) => {
      state.searchMyInfoLoading = false;
      state.searchMyInfoDone = true;
      state.userInfo = action.payload
      console.log(action.payload)
    });
    builder.addCase(searchMyInfoAsync.rejected, (state, action) => {
      state.searchMyInfoLoading = false;
      state.searchMyInfoError = action.data
    });
  }
});

export const { clearSignUpDone, clearSearchMyInfoDone } = userSlice.actions;

export default userSlice.reducer;