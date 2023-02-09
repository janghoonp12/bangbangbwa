import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

function* watchWriteNotice() {
  yield takeLatest(OAUTH2_SIGN_IN_REQUEST, oauth2SignIn);
}

export default function* userSaga() {
  yield all([
    fork(watchWriteNotice),
  ]);
}