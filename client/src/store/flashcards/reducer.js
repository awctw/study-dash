import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../utils";
import { addFlashcardAsync, addModuleAsync, getModulesAsync } from "./thunks";

const INIT_STATE = {
  modules: [],
  getModules: REQUEST_STATE.IDLE,
  addModule: REQUEST_STATE.IDLE,
  addFlashcard: REQUEST_STATE.IDLE,
  error: null,
};

const flashcardSlice = createSlice({
  name: "flashcards",
  initialState: INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getModulesAsync.pending, (state) => {
        state.getModules = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getModulesAsync.fulfilled, (state, action) => {
        state.getModules = REQUEST_STATE.FULFILLED;
        state.modules = action.payload;
      })
      .addCase(getModulesAsync.rejected, (state, action) => {
        state.getModules = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(addModuleAsync.pending, (state) => {
        state.addModule = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(addModuleAsync.fulfilled, (state, action) => {
        state.addModule = REQUEST_STATE.FULFILLED;
        state.modules.push(action.payload);
      })
      .addCase(addModuleAsync.rejected, (state, action) => {
        state.addModule = REQUEST_STATE.REJECTED;
        state.error = action.error;
      });
  },
});

export const { addModule, addFlashcard } = flashcardSlice.actions;

export default flashcardSlice.reducer;
