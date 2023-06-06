import TODOListReducer from "./TODOList_Slice";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        todoReducer: TODOListReducer
    },
    devTools: true
});