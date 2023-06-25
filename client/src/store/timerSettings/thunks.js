import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import timerSettingsService from "./service";

const getTimerSettingsAsync = createAsyncThunk(
  actionTypes.GET_TIMERSETTINGS,
  async (_id) => {
    return await timerSettingsService.getTimerSettings(_id);
  }
);

const putTimerSettingsAsync = createAsyncThunk(
  actionTypes.PUT_TIMERSETTINGS,
  async (update) => {
    return await timerSettingsService.putTimerSettings(update);
  }
);

export { getTimerSettingsAsync, putTimerSettingsAsync };
