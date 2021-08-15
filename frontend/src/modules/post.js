import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../lib/api";

export const getPostsAsync = createAsyncThunk("post/getPostsAsync", api.getPosts);
export const getPostAsync = createAsyncThunk("post/getPostAsync", api.getPost);
export const createPostAsync = createAsyncThunk("post/createPostAsync", api.createPost);
export const deletePostAsync = createAsyncThunk("post/deletePostAsync", api.deletePost);

const initialState = {
  posts: [],
  getPostsLoading: "idle",
  getPostsError: null,
  post: [],
  getPostLoading: "idle",
  getPostError: null,
  createPostLoading: "idle",
  createPostError: null,
  deletePostLoading: "idle",
  deletePostError: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostsAsync.pending, (state) => {
        if (state.getPostsLoading === "idle") {
          state.getPostsLoading = "pending";
        }
        state.getPostsError = false;
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        if (state.getPostsLoading === "pending") {
          state.getPostsLoading = "idle";
          state.posts = action.payload;
        }
      })
      .addCase(getPostsAsync.rejected, (state, action) => {
        if (state.getPostsLoading === "pending") {
          state.getPostsLoading = "idle";
          state.getPostsError = action.error;
        }
      })
      .addCase(getPostAsync.pending, (state) => {
        if (state.getPostLoading === "idle") {
          state.getPostLoading = "pending";
        }
        state.getPostError = false;
      })
      .addCase(getPostAsync.fulfilled, (state, action) => {
        if (state.getPostLoading === "pending") {
          state.getPostLoading = "idle";
          state.post = action.payload;
        }
      })
      .addCase(getPostAsync.rejected, (state, action) => {
        if (state.getPostLoading === "pending") {
          state.getPostLoading = "idle";
          state.getPostError = action.error;
        }
      })
      .addCase(deletePostAsync.pending, (state) => {
        if (state.deletePostLoading === "idle") {
          state.deletePostLoading = "pending";
        }
        state.deletePostError = false;
      })
      .addCase(deletePostAsync.fulfilled, (state) => {
        if (state.deletePostLoading === "pending") {
          state.deletePostLoading = "idle";
        }
      })
      .addCase(deletePostAsync.rejected, (state, action) => {
        if (state.deletePostLoading === "pending") {
          state.deletePostLoading = "idle";
          state.deletePostError = action.error;
        }
      })
      .addCase(createPostAsync.pending, (state) => {
        if (state.createPostLoading === "idle") {
          state.createPostLoading = "pending";
        }
        state.createPostError = false;
      })
      .addCase(createPostAsync.fulfilled, (state) => {
        if (state.createPostLoading === "pending") {
          state.createPostLoading = "idle";
        }
      })
      .addCase(createPostAsync.rejected, (state, action) => {
        if (state.createPostLoading === "pending") {
          state.createPostLoading = "idle";
          state.createPostError = action.error;
        }
      });
  },
});

export default postSlice.reducer;
