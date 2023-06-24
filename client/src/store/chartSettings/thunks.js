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
  async (userEmail, chartSetting) => {
    return await chartSettingsService.putChartSettings(userEmail, chartSetting);
  }
);

export { getChartSettingsAsync, putChartSettingsAsync };
