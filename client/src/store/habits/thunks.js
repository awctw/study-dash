import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import habitService from "./service"

const getHabitsAsync = createAsyncThunk(
    actionTypes.GET_HABITS,
    async (userID) => {
        return await habitService.getHabits(userID)
    }
)

const addHabitAsync = createAsyncThunk(
    actionTypes.ADD_HABIT,
    async (habit) => {
        return await habitService.addHabit(habit)
    }
)

export { getHabitsAsync, addHabitAsync }