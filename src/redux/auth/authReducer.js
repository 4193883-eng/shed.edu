import { createReducer } from '@reduxjs/toolkit';
import { flushAuthTokenAction, setAuthTokenAction } from './authActions.js';

const initialState = {
  authToken: null,
};

// eslint-disable-next-line no-unused-vars
export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthTokenAction, (state, action) => {
      state.authToken = action.payload;
    })
    .addCase(flushAuthTokenAction, () => {
      return initialState;
    });
});
