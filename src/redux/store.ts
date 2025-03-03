import { combineReducers, configureStore } from "@reduxjs/toolkit";
import uiSlice from "./features/ui/uiSlice";
import authSlice from "./features/auth/authSlice";
import blogSlice from "./features/blog/blogSlice";

const rootReducer = combineReducers({
  ui: uiSlice,
  auth: authSlice,
  blog: blogSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
