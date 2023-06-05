import TODOListReducer from "./TODOListReducer";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        todoReducer: TODOListReducer
    },
    devTools: true
});