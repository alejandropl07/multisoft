import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: {}, isAuth: false };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout(state) {
      state.user = {};
      state.isAuth = false
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
