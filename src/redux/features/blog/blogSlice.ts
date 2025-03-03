import { createSlice } from "@reduxjs/toolkit";

const initialState = { blogs: [{}] };

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchBlog(state, action) {
      state.blogs = action.payload; 
    },
  },
});

export const { fetchBlog } = blogSlice.actions;
export default blogSlice.reducer;