import { combineReducers } from '@reduxjs/toolkit';

import loadingReducer from '../features/loading';
import modalReducer from '../features/modal';

const rootReducer = combineReducers({
  loading: loadingReducer,
  modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
