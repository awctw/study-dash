import todoListReducer from "./todoListSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        todoReducer: todoListReducer,
    },
});