import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import chartSettingsService from "./service";

const getChartSettingsAsync = createAsyncThunk(
  actionTypes.GET_CHARTSETTINGS,
  async (userEmail) => {
    return await chartSettingsService.getChartSettings(userEmail);
  }
);

const putChartSettingsAsync = createAsyncThunk(
  actionTypes.PUT_CHARTSETTINGS,
  async (update) => {
    return await chartSettingsService.putChartSettings(update);
  }
);

export { getChartSettingsAsync, putChartSettingsAsync };
