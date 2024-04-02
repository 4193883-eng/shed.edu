import { createReducer } from '@reduxjs/toolkit';
import { flushAuthTokenAction, setAuthTokenAction } from './authActions.js';
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  authToken: null,
};

// eslint-disable-next-line no-unused-vars
const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthTokenAction, (state, action) => {
      state.authToken = action.payload;
    })
    .addCase(flushAuthTokenAction, () => {
      return initialState;
    });
});

export default persistReducer(
  {
    key: 'auth',
    storage,
  },
  authReducer
);
