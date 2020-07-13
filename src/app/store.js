import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import mapdataReducer from '../features/mapdata/mapdataSlice';
import createSagaMiddleware from "redux-saga";
import apiSaga from "./sagas/api-saga"

//const initializeSagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    counter: counterReducer,
    mapData: mapdataReducer,
  },
  //middleware: [initializeSagaMiddleware],
});

//initializeSagaMiddleware.run(apiSaga)