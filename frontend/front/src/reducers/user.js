import produce from '../util/produce';

export const initialState = {
    signUpLoading: false,
    signUpDone: false,
    signUpError: null,
    signInLoading: false,
    signInDone: false,
    signInError: null,
    me: null,
};

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';


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
        id: action.data.id,
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
    default:
      break;
  }
})

export default reducer;