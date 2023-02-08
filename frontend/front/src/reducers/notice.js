import produce from '../util/produce';

export const initialState = {
  notice: null,
  noticeWriteLoading: false,
  noticeWriteDone: false,
  noticeWriteError: null,
};

export const NOTICE_WRITE_REQUEST = 'NOTICE_WRITE_REQUEST';
export const NOTICE_WRITE_SUCCESS = 'NOTICE_WRITE_SUCCESS';
export const NOTICE_WRITE_FAILURE = 'NOTICE_WRITE_FAILURE';


const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    default:
      break;
  }
})

export default reducer;