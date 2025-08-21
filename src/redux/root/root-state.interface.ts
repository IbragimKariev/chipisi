import { mainApi } from "../api/api";
import { AuthState, AUTH_SLICE_KEY } from "../slices/authSlice";

export interface RootState {
  [mainApi.reducerPath]: any;
  [AUTH_SLICE_KEY]: AuthState;
}
