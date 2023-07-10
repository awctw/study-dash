import todoListReducer from "./TODOList/todoListSlice";
import flashcardReducer from "./flashcards/reducer";
import loginReducer from "./authentication/loginSlice";
import chartSettingsReducer from "./chartSettings/reducer";
import timerSettingsReducer from "./timerSettings/reducer";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    flashcards: flashcardReducer,
    todoReducer: todoListReducer,
    loginReducer: loginReducer,
    chartSettingsReducer: chartSettingsReducer,
    timerSettingsReducer: timerSettingsReducer,
  },
});
