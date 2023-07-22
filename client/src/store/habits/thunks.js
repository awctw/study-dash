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

const toggleHabbitDateAsync = createAsyncThunk(
    actionTypes.TOGGLE_HABIT_DATE,
    async (habitID) => {
        return await habitService.toggleHabbitDate(habitID);
    }
)

export { getHabitsAsync, addHabitAsync, toggleHabbitDateAsync };
