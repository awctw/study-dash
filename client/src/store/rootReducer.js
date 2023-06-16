import todoListReducer from "./todoListSlice";
import flashcardReducer from "./flashcards/reducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    flashcards: flashcardReducer,
    todoReducer: todoListReducer,
  },
});
