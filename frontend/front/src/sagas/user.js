import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from '../reducers/user'

function signUpAPI(data) {
  console.log(data)
  return axios.post('/users/new', data)
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    })
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchSignUp),
  ]);
}