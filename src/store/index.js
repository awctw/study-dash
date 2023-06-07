import { configureStore } from "@reduxjs/toolkit";
import flashcardReducer from "./flashcards/reducer";

export const store = configureStore({
    reducer: {
        flashcards: flashcardReducer
    },
    devTools: true
});