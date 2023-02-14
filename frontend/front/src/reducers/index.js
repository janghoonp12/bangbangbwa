import { combineReducers } from "redux";
import axios from 'axios';

// import user from './user'
// import notice from './notice'
import userSlice from "./userSlice";
import noticeSlice from "./noticeSlice"
import itemSlice from "./itemSlice"
import broadcastSlice from "./broadcastSlice"
import bookmarkSlice from "./bookmarkSlice"
import fileSlice from "./fileSlice";
import commonSlice from "./commonSlice"

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//axios.defaults.baseURL = "http://localhost:8081/api/"
axios.defaults.baseURL = "https://i8a405.p.ssafy.io/api"

const persistConfig = {
    key: "root",
    // localStorage에 저장합니다.
    storage,
    // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
    whitelist: ["userSlice"]
    // blacklist -> 그것만 제외합니다
};


export const rootReducer = combineReducers({
    userSlice,
    noticeSlice,
    itemSlice,
    broadcastSlice,
    bookmarkSlice,
    fileSlice,
    commonSlice
})

export default persistReducer(persistConfig, rootReducer);
