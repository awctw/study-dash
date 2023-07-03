import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import timerSettingsService from "./service";

const getTimerSettingsAsync = createAsyncThunk(
  actionTypes.GET_TIMERSETTINGS,
  async (userID) => {
    return await timerSettingsService.getTimerSettings(userID);
  }
);

const putTimerSettingsAsync = createAsyncThunk(
  actionTypes.PUT_TIMERSETTINGS,
  async (settings) => {
    return await timerSettingsService.putTimerSettings(settings);
  }
);

export { getTimerSettingsAsync, putTimerSettingsAsync };
