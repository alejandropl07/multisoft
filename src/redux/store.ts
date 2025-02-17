import { combineReducers, configureStore } from "@reduxjs/toolkit";
import uiSlice from "./features/ui/uiSlice";
import authSlice from "./features/auth/authSlice";
import leadSlice from "./features/lead/leadSlice";

const rootReducer = combineReducers({
  ui: uiSlice,
  auth: authSlice,
  lead: leadSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
