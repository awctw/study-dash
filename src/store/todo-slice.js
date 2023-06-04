import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todo: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    add(state, action) {
      state.todo.push(action.payload);
    },
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;
