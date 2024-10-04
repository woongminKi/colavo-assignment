import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import itemReducer from './feature/itemList/itemSlice';
import discountReducer from './feature/discountItems/discountSlice';

const reducer = combineReducers({
  itemReducer,
  discountReducer,
});
const store = configureStore({
  reducer: reducer,
});
export default store;
