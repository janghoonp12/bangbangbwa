import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga);