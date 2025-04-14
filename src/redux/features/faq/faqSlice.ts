import { createSlice } from "@reduxjs/toolkit";

const initialState = { faqs: [{}] };

export const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    fetchFaq(state, action) {
      state.faqs = action.payload;
    },
  },
});

export const { fetchFaq } = faqSlice.actions;
export default faqSlice.reducer;