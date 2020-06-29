import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import address from "./reducers/address";
import { forbiddenWordsMiddleware } from "./middleware";

export default configureStore({
  reducer: {
    counter: counterReducer,
    searchAddress: address,
  },
  middleware: [forbiddenWordsMiddleware]
});
