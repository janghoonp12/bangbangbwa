import produce from '../util/produce';

export const initialState = {
    signUpLoading: false,
    signUpDone: false,
    signUpError: null,
    signUpInfo: null,
};

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';


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
    default:
      break;
  }
})

export default reducer;