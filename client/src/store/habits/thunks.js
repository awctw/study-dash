import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import habitService from "./service";

const getHabitsAsync = createAsyncThunk(
  actionTypes.GET_HABITS,
  async (userID) => {
    return await habitService.getHabits(userID);
  }
);

const addHabitAsync = createAsyncThunk(actionTypes.ADD_HABIT, async (habit) => {
  return await habitService.addHabit(habit);
});

const toggleHabitDateAsync = createAsyncThunk(
  actionTypes.TOGGLE_HABIT_DATE,
  async (habitID) => {
    return await habitService.toggleHabitDate(habitID);
  }
);

const deleteHabitAsync = createAsyncThunk(
  actionTypes.DELETE_HABIT,
  async (habitID) => {
    return await habitService.deleteHabit(habitID);
  }
);

export {
  getHabitsAsync,
  addHabitAsync,
  toggleHabitDateAsync,
  deleteHabitAsync,
};
