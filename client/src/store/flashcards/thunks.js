import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import flashcardService from "./service";

const getModulesAsync = createAsyncThunk(actionTypes.GET_MODULES, async () => {
  return await flashcardService.getModules();
});

const addModuleAsync = createAsyncThunk(
  actionTypes.ADD_MODULE,
  async (module) => {
    return await flashcardService.addModule(module);
  }
);

const addFlashcardAsync = createAsyncThunk(
  actionTypes.ADD_FLASHCARD,
  async (moduleId, cardData) => {
    return await flashcardService.addFlashcard(moduleId, cardData);
  }
);

export { getModulesAsync, addModuleAsync, addFlashcardAsync };
