import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [
    {
      id: 0,
    },
  ],
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchBlog(state, action) {
      state.blogs = action.payload;
    },
    deleteBlog: (state, action) => {
      state.blogs.filter((blog) => blog.id !== action.payload);
    },
    editBlog: (state, action) => {
      state.blogs.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
  },
});

export const { fetchBlog, deleteBlog, editBlog } = blogSlice.actions;
export default blogSlice.reducer;
