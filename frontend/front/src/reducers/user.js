import { type } from '@testing-library/user-event/dist/type';
import produce from '../util/produce';

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
    me: null,
};

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export const OAUTH2_SIGN_IN_REQUEST = 'OAUTH2_SIGN_IN_REQUEST';
export const OAUTH2_SIGN_IN_SUCCESS = 'OAUTH2_SIGN_IN_SUCCESS';
export const OAUTH2_SIGN_IN_FAILURE = 'OAUTH2_SIGN_IN_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      draft.signUpLoading = true;
      draft.signUpError = null;
      draft.signUpDone = false;
      break;
    case SIGN_UP_SUCCESS:
      draft.signUpLoading = false;
      draft.signUpDone = true;
      break;
    case SIGN_UP_FAILURE:
      draft.signUpLoading = false;
      draft.signUpError = action.error;
      break;
    case SIGN_IN_REQUEST:
      draft.signInLoading = true;
      draft.signInError = null;
      draft.signInDone = false;
      break;
    case SIGN_IN_SUCCESS:
      draft.signInLoading = false;
      draft.me = {
        email: action.data.email,
        nickname: action.data.nickname
      }
      draft.signInDone = true;
      sessionStorage.setItem("access-token", action.data.accesstoken)
      sessionStorage.setItem("refresh-token", action.data.refreshtoken)
      break;
    case SIGN_IN_FAILURE:
      draft.signInLoading = false;
      draft.signInError = action.error;
      break;
    // case OAUTH2_SIGN_IN_REQUEST:
    //   draft.oauth2SignInLoading = true;
    //   console.log(action.data.userEmail, action.data.userNickname, action.data.accessToken, action.data.refreshToken)
    //   if (action.data.userEmail !== undefined && action.data.userNickname !== undefined && action.data.accesstoken !== undefined && action.data.refreshtoken !== undefined) {
    //     draft.me = {
    //       email: action.data.userEmail,
    //       nickname: action.data.userNickname
    //     }
    //     sessionStorage.clear()
    //     sessionStorage.setItem("access-token", action.data.accessToken)
    //     sessionStorage.setItem("refresh-token", action.data.refreshToken)
    //     draft.oauth2SignInLoading = false;
    //     draft.oauth2SignInDone = true;
    //   } else {
    //     draft.oauth2SignInLoading = false;
    //     draft.oauth2SignInError = "로그인실패";
    //   }
    //   break;
    case OAUTH2_SIGN_IN_REQUEST:
      draft.oauth2SignInLoading = true;
      draft.oauth2SignInError = null;
      draft.oauth2SignInDone = false;
      break;
    case OAUTH2_SIGN_IN_SUCCESS:
      draft.oauth2SignInLoading = false;
      draft.me = {
        email: action.data.userEmail,
        nickname: action.data.userNickname
      }
      sessionStorage.clear()
      sessionStorage.setItem("access-token", action.data.accessToken)
      sessionStorage.setItem("refresh-token", action.data.refreshToken)
      draft.oauth2SignInDone = true;
      break;
    case OAUTH2_SIGN_IN_FAILURE:
      draft.oauth2SignInLoading = false;
      draft.oauth2SignInError = action.error;
      break;
    default:
      break;
  }
})

export default reducer;