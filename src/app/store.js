import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import address from "./reducers/address";
import { forbiddenWordsMiddleware } from "./middleware";
import thunk from "redux-thunk";
import mapData from "./reducers/mapdata";
import createSagaMiddleware from "redux-saga";
import apiSaga from "./sagas/api-saga"

const initializeSagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    counter: counterReducer,
    searchAddress: address,
    mapData: mapData,
  },
  middleware: [forbiddenWordsMiddleware, thunk, initializeSagaMiddleware],
});

initializeSagaMiddleware.run(apiSaga)