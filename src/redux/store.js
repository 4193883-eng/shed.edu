import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authReducer.js';

export const store = configureStore({
  reducer: authReducer,
});
