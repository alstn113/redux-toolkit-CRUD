import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./post";
import sampleReducer from "./sample";

export const store = configureStore({
  reducer: { post: postReducer, sample: sampleReducer },
});
