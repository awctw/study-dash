import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../utils";
import { getChartSettingsAsync, putChartSettingsAsync } from "./thunks";

const INIT_STATE = {
  chartSettings: {
    axisScale: 24,
    categoryColors: [
      { category: "Biology", color: "#42f560" },
      { category: "Chemistry", color: "#d742f5" },
      { category: "Computer Science", color: "#55515e" },
      { category: "Language Arts", color: "#b726c7" },
      { category: "Math", color: "#2e26c7" },
      { category: "Musical Art", color: "#bfc726" },
      { category: "Physics", color: "#000000" },
      { category: "Sports", color: "#ff001e" },
      { category: "Visual Arts", color: "#ff7b00" },
      { category: "Work", color: "#00eaff" },
    ],
  },
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
