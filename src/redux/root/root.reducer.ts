import { combineReducers } from "@reduxjs/toolkit";
import { mainApi } from "../api/api";
import { AUTH_SLICE_KEY, authSlice } from "../slices/authSlice";
import { RootState } from "./root-state.interface";

export const rootReducer = combineReducers<RootState>({
    [mainApi.reducerPath]: mainApi.reducer,
    [AUTH_SLICE_KEY]: authSlice.reducer
})