import { createReducer } from '@reduxjs/toolkit';
import { flushAuthTokenAction, setAuthTokenAction } from './authActions.js';
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {clearToken, setToken} from "../../config/axios.js";

const initialState = {
  authToken: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthTokenAction, (state, action) => {
      state.authToken = action.payload;
      setToken(action.payload);
    })
    .addCase(flushAuthTokenAction, () => {
      clearToken();
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
