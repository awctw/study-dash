import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../utils";
import { getChartSettingsAsync, putChartSettingsAsync } from "./thunks";

const INIT_STATE = {
  chartSettings: null,
  getChartSettings: REQUEST_STATE.IDLE,
  putChartSettings: REQUEST_STATE.IDLE,
  error: null,
};

const chartSettingsSlice = createSlice({
  name: "chartSettings",
  initialState: INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChartSettingsAsync.pending, (state) => {
        state.getModules = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getChartSettingsAsync.fulfilled, (state, action) => {
        state.getModules = REQUEST_STATE.FULFILLED;
        state.chartSettings = action.payload;
      })
      .addCase(getChartSettingsAsync.rejected, (state, action) => {
        state.getModules = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(putChartSettingsAsync.pending, (state) => {
        state.getModules = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(putChartSettingsAsync.fulfilled, (state, action) => {
        state.getModules = REQUEST_STATE.FULFILLED;
        state.chartSettings = action.payload;
      })
      .addCase(putChartSettingsAsync.rejected, (state, action) => {
        state.getModules = REQUEST_STATE.REJECTED;
        state.error = action.error;
      });
  },
});

export default chartSettingsSlice.reducer;
