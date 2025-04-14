import { createSlice } from "@reduxjs/toolkit";

const initialState = { abouts: {} };

export const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    fetchAbout(state, action) {
      state.abouts = action.payload;
    },
  },
});

export const { fetchAbout } = aboutSlice.actions;
export default aboutSlice.reducer;