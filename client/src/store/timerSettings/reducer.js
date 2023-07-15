import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../utils";
import { getTimerSettingsAsync, putTimerSettingsAsync } from "./thunks";

const INIT_STATE = {
  timerSettings: {
    pomodoroTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  },
  getTimerSettings: REQUEST_STATE.IDLE,
  putTimerSettings: REQUEST_STATE.IDLE,
  error: null,
};

const timerSettingsSlice = createSlice({
  name: "timerSettings",
  initialState: INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTimerSettingsAsync.pending, (state) => {
        state.getModules = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getTimerSettingsAsync.fulfilled, (state, action) => {
        state.getModules = REQUEST_STATE.FULFILLED;
        state.timerSettings = action.payload;
      })
      .addCase(getTimerSettingsAsync.rejected, (state, action) => {
        state.getModules = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(putTimerSettingsAsync.pending, (state) => {
        state.getModules = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(putTimerSettingsAsync.fulfilled, (state, action) => {
        state.getModules = REQUEST_STATE.FULFILLED;
        state.timerSettings = action.payload;
      })
      .addCase(putTimerSettingsAsync.rejected, (state, action) => {
        state.getModules = REQUEST_STATE.REJECTED;
        state.error = action.error;
      });
  },
});

export default timerSettingsSlice.reducer;
