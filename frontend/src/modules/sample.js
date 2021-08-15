import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/client";

export const getSampleAsync = createAsyncThunk("sample/getSampleAsync", async (rejectWithValue) => {
  try {
    const { data } = await axios.get("/api/post");
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  sample: [],
  getSampleLoading: "idle",
  getSampleError: null,
};

export const sampleSlice = createSlice({
  name: "sample",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSampleAsync.pending, (state) => {
        if (state.getSampleLoading === "idle") {
          state.getSampleLoading = "pending";
        }
        state.getSampleError = false;
      })
      .addCase(getSampleAsync.fulfilled, (state, action) => {
        if (state.getSampleLoading === "pending") {
          state.getSampleLoading = "idle";
          state.sample = action.payload;
        }
      })
      .addCase(getSampleAsync.rejected, (state, action) => {
        if (state.getSampleLoading === "pending") {
          state.getSampleLoading = "idle";
          state.getSampleError = action.payload;
        }
      });
  },
});

export default sampleSlice.reducer;
