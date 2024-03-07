import {createAction} from "@reduxjs/toolkit";

export const setAuthTokenAction = createAction('@auth/setAuthToken')

export const flushAuthTokenAction = createAction('@auth/flushAuthToken')
