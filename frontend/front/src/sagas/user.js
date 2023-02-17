import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  OAUTH2_SIGN_IN_REQUEST,
  OAUTH2_SIGN_IN_SUCCESS,
  OAUTH2_SIGN_IN_FAILURE
} from '../reducers/user'

function signUpAPI(data) {
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

function signInAPI(data) {
  return axios.post('/users/auth', data)
}

function* signIn(action) {
  try {
    const result = yield call(signInAPI, action.data);
    yield put({
      type: SIGN_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_IN_FAILURE,
      error: err.response.data,
    })
  }
}

function* oauth2SignIn(action) {
  try {
    yield put({
      type: OAUTH2_SIGN_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: OAUTH2_SIGN_IN_FAILURE,
      error: err.response.data,
    })
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchSignIn() {
  yield takeLatest(SIGN_IN_REQUEST, signIn);
}

function* watchOauth2SignIn() {
  yield takeLatest(OAUTH2_SIGN_IN_REQUEST, oauth2SignIn);
}

export default function* userSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchSignIn),
    fork(watchOauth2SignIn),
  ]);
}