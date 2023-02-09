import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user'
import noticeSaga from './notice'

//axios.defaults.baseURL = "http://localhost:8081/api"
axios.defaults.baseURL = "https://i8a405.p.ssafy.io/api"
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
  ])
}
