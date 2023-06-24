import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import chartSettingsService from "./service";

const getChartSettingsAsync = createAsyncThunk(
  actionTypes.GET_CHARTSETTINGS,
  async () => {
    return await chartSettingsService.getChartSettings();
  }
);

const putChartSettingsAsync = createAsyncThunk(
  actionTypes.PUT_CHARTSETTINGS,
  async (chartSetting) => {
    return await chartSettingsService.putChartSettings(chartSetting);
  }
);

export { getChartSettingsAsync, putChartSettingsAsync };
