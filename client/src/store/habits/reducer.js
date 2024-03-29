import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../utils";
import {
  getHabitsAsync,
  addHabitAsync,
  toggleHabitDateAsync,
  deleteHabitAsync,
} from "./thunks";

const INIT_STATE = {
  habits: [],
  getHabits: REQUEST_STATE.IDLE,
  addHabit: REQUEST_STATE.IDLE,
  toggleHabitDate: REQUEST_STATE.IDLE,
  deleteHabit: REQUEST_STATE.IDLE,
  error: null,
};

const habitSlice = createSlice({
  name: "habits",
  initialState: INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHabitsAsync.pending, (state) => {
        state.getHabits = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getHabitsAsync.fulfilled, (state, action) => {
        state.getHabits = REQUEST_STATE.FULFILLED;
        state.habits = action.payload;
      })
      .addCase(getHabitsAsync.rejected, (state, action) => {
        state.getHabits = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(addHabitAsync.pending, (state) => {
        state.addHabit = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(addHabitAsync.fulfilled, (state, action) => {
        state.addHabit = REQUEST_STATE.FULFILLED;
        state.habits.push(action.payload);
      })
      .addCase(addHabitAsync.rejected, (state, action) => {
        state.addHabit = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(toggleHabitDateAsync.pending, (state) => {
        state.toggleHabitDate = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(toggleHabitDateAsync.fulfilled, (state, action) => {
        state.toggleHabitDate = REQUEST_STATE.FULFILLED;
        state.habits = action.payload;
      })
      .addCase(toggleHabitDateAsync.rejected, (state, action) => {
        state.toggleHabitDate = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(deleteHabitAsync.pending, (state) => {
        state.deleteHabit = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(deleteHabitAsync.fulfilled, (state, action) => {
        state.deleteHabit = REQUEST_STATE.FULFILLED;
        state.habits = action.payload;
      })
      .addCase(deleteHabitAsync.rejected, (state, action) => {
        state.deleteHabit = REQUEST_STATE.REJECTED;
        state.error = action.error;
      });
  },
});

export default habitSlice.reducer;
