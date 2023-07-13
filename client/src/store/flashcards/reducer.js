import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../utils";
import {
  addFlashcardAsync,
  addModuleAsync,
  deleteFlashcardAsync,
  deleteModuleAsync,
  editFlashcardAsync,
  getModulesAsync,
} from "./thunks";

const INIT_STATE = {
  modules: [],
  getModules: REQUEST_STATE.IDLE,
  addModule: REQUEST_STATE.IDLE,
  addFlashcard: REQUEST_STATE.IDLE,
  editFlashcard: REQUEST_STATE.IDLE,
  deleteFlashcard: REQUEST_STATE.IDLE,
  deleteModule: REQUEST_STATE.IDLE,
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
      })
      .addCase(addFlashcardAsync.pending, (state) => {
        state.addFlashcard = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(addFlashcardAsync.fulfilled, (state, action) => {
        state.addFlashcard = REQUEST_STATE.FULFILLED;

        const idx = state.modules.findIndex(
          (module) => module._id === action.payload._id
        );
        state.modules[idx] = action.payload;
      })
      .addCase(addFlashcardAsync.rejected, (state, action) => {
        state.addFlashcard = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(editFlashcardAsync.pending, (state) => {
        state.editFlashcard = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(editFlashcardAsync.fulfilled, (state, action) => {
        state.editFlashcard = REQUEST_STATE.FULFILLED;

        const idx = state.modules.findIndex(
          (module) => module._id === action.payload.id
        );

        const cardIndex = Number(action.payload.index);

        state.modules[idx].questions[cardIndex] = action.payload.question;
        state.modules[idx].answers[cardIndex] = action.payload.answer;
      })
      .addCase(editFlashcardAsync.rejected, (state, action) => {
        state.editFlashcard = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(deleteFlashcardAsync.pending, (state) => {
        state.deleteFlashcard = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(deleteFlashcardAsync.fulfilled, (state, action) => {
        state.deleteFlashcard = REQUEST_STATE.FULFILLED;

        const { moduleId, index } = action.payload;

        const modIdx = state.modules.findIndex(
          (module) => module._id === moduleId
        );

        state.modules[modIdx].questions.splice(index, 1);
        state.modules[modIdx].answers.splice(index, 1);
      })
      .addCase(deleteFlashcardAsync.rejected, (state, action) => {
        state.deleteFlashcard = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(deleteModuleAsync.pending, (state) => {
        state.deleteModule = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(deleteModuleAsync.fulfilled, (state, action) => {
        state.deleteModule = REQUEST_STATE.FULFILLED;

        const moduleId = action.payload;

        state.modules = state.modules.filter(
          (module) => module._id !== moduleId
        );
      })
      .addCase(deleteModuleAsync.rejected, (state, action) => {
        state.deleteModule = REQUEST_STATE.REJECTED;
        state.error = action.error;
      });
  },
});

export default flashcardSlice.reducer;
