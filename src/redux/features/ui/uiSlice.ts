import { createSlice } from "@reduxjs/toolkit";

const initialState = { showLogin: true, showRegister: false, isDark: false };

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showLoginAction: (state) => {
      state.showLogin = true;
      state.showRegister = false;
    },
    showRegisterAction: (state) => {
      state.showLogin = false;
      state.showRegister = true;
    },
    toggleDarkMode: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export const { showLoginAction, showRegisterAction, toggleDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
