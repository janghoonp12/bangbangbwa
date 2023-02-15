import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
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
  findPasswordLoading: false,
  findPasswordDone: false,
  findPasswordError: null,
  searchMyInfoLoading: false,
  searchMyInfoDone: false,
  searchMyInfoError: null,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
  changePasswordLoading: false,
  changePasswordDone: false,
  changePasswordError: null,
  withdrawalLoading: false,
  withdrawalDone: false,
  withdrawalError: null,
  me: null,
  userInfo : null
};

export const signUpAsync = createAsyncThunk(
  'user/SIGN_UP',
  async (data, thunkAPI) => {
    try {
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

export const findPasswordAsync = createAsyncThunk(
  'user/FIND_MY_PASSWORD',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `/users/find/password`, data
      );

      return response.data
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

export const changeNicknameAsync = createAsyncThunk(
  'user/CHANGE_MY_NICKNAME',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.patch(
        `/user/mypage/modify/nickname/${data}`
      );
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const changePasswordAsync = createAsyncThunk(
  'user/CHANGE_MY_PASSWORD',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.patch(
        `/user/mypage/modify/password/${data}`
      );

      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const withdrawalAsync = createAsyncThunk(
  'user/WITHDRAWAL_USER',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosHeaderToken.patch(
        `/user/mypage/deactivate`
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
    clearSignInDone: (state) => {
      state.signInDone = false
    },
    clearFindPasswordDone: (state) => {
      state.findPasswordDone = false
    },
    changeMeNickname: (state, action) => {
      state.me.nickname = action.payload;
    },
    logout: (state) => {
      state.me = null;
      state.signInDone = false;
      sessionStorage.clear();
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
    builder.addCase(signUpAsync.rejected, (state, error) => {
      state.signUpLoading = false;
      state.signUpError = error.payload.response.data.msg[0]
      Swal.fire({
        icon: 'error',
        title: state.signUpError,
        showConfirmButton: false,
        timer: 1000
      })
    });
    builder.addCase(findPasswordAsync.pending, (state, action) => {
      state.findPasswordLoading = true;
      state.findPasswordError = null;
      state.findPasswordDone = false;
    });
    builder.addCase(findPasswordAsync.fulfilled, (state, action) => {
      state.findPasswordLoading = false;
      state.findPasswordDone = true;
    });
    builder.addCase(findPasswordAsync.rejected, (state, error) => {
      state.findPasswordLoading = false;
      state.findPasswordError = error.payload.response.data.msg[0]
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
    builder.addCase(signInAsync.rejected, (state, error) => {
      state.signInLoading = false;
      state.signInError = error.payload.response.data.msg[0]
      Swal.fire({
        icon: 'error',
        title: state.signInError,
        showConfirmButton: false,
        timer: 1000
      })
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
    });
    builder.addCase(searchMyInfoAsync.rejected, (state, action) => {
      state.searchMyInfoLoading = false;
      state.searchMyInfoError = action.data
    });
    builder.addCase(changeNicknameAsync.pending, (state, action) => {
      state.changeNicknameLoading = true;
      state.changeNicknameError = null;
      state.changeNicknameDone = false;
    });
    builder.addCase(changeNicknameAsync.fulfilled, (state, action) => {
      state.changeNicknameLoading = false;
      state.changeNicknameDone = true;
    });
    builder.addCase(changeNicknameAsync.rejected, (state, action) => {
      state.changeNicknameLoading = false;
      state.changeNicknameError = action.error
    });
    builder.addCase(changePasswordAsync.pending, (state, action) => {
      state.changePasswordLoading = true;
      state.changePasswordError = null;
      state.changePasswordDone = false;
    });
    builder.addCase(changePasswordAsync.fulfilled, (state, action) => {
      state.changePasswordLoading = false;
      state.changePasswordDone = true;
    });
    builder.addCase(changePasswordAsync.rejected, (state, action) => {
      state.changePasswordLoading = false;
      state.changePasswordError = action.error
    });
    builder.addCase(withdrawalAsync.pending, (state, action) => {
      state.withdrawalLoading = true;
      state.withdrawalError = null;
      state.withdrawalDone = false;
    });
    builder.addCase(withdrawalAsync.fulfilled, (state, action) => {
      state.withdrawalLoading = false;
      state.withdrawalDone = true;
    });
    builder.addCase(withdrawalAsync.rejected, (state, action) => {
      state.withdrawalLoading = false;
      state.withdrawalError = action.error
    });
  }
});

export const { clearSignUpDone, clearSearchMyInfoDone, clearSignInDone, changeMeNickname, logout, clearFindPasswordDone } = userSlice.actions;

export default userSlice.reducer;