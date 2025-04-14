import { combineReducers, configureStore } from "@reduxjs/toolkit";
import uiSlice from "./features/ui/uiSlice";
import authSlice from "./features/auth/authSlice";
import blogSlice from "./features/blog/blogSlice";
import faqSlice from "./features/faq/faqSlice";
import aboutSlice from "./features/about/aboutSlice";

const rootReducer = combineReducers({
  ui: uiSlice,
  auth: authSlice,
  blog: blogSlice,
  faq: faqSlice,
  about: aboutSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
