import todoListReducer from "./todoListSlice";
import flashcardReducer from "./flashcards/reducer";
import loginReducer from "./authentication/loginSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    flashcards: flashcardReducer,
    todoReducer: todoListReducer,
    loginReducer: loginReducer,
  },
});
