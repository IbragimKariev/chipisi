import { configureStore} from "@reduxjs/toolkit";

import { rootReducer } from "./root.reducer";
import { mainApi } from "../api/api";

declare const process: any;
const isDevelopmentMode = process.env.NODE_ENV === "development";

const rootStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
  devTools: isDevelopmentMode,
});

export type AppDispatch = typeof rootStore.dispatch;

export { rootStore };
