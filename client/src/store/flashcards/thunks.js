import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import flashcardService from "./service";

const getModulesAsync = createAsyncThunk(
  actionTypes.GET_MODULES,
  async (userID) => {
    return await flashcardService.getModules(userID);
  }
);

const addModuleAsync = createAsyncThunk(
  actionTypes.ADD_MODULE,
  async (module) => {
    return await flashcardService.addModule(module);
  }
);

const addFlashcardAsync = createAsyncThunk(
  actionTypes.ADD_FLASHCARD,
  async (cardData) => {
    return await flashcardService.addFlashcard(cardData);
  }
);

const editFlashcardAsync = createAsyncThunk(
  actionTypes.EDIT_FLASHCARD,
  async (cardData) => {
    return await flashcardService.editFlashcard(cardData);
  }
);

const deleteFlashcardAsync = createAsyncThunk(
  actionTypes.DEL_FLASHCARD,
  async (cardData) => {
    return await flashcardService.deleteFlashcard(cardData);
  }
);

const deleteModuleAsync = createAsyncThunk(
  actionTypes.DEL_MODULE,
  async (moduleId) => {
    return await flashcardService.deleteModule(moduleId);
  }
);

const getScheduledCardsAsync = createAsyncThunk(
  actionTypes.GET_SCHEDULED_CARDS,
  async (userID) => {
    return await flashcardService.getScheduledCards(userID);
  }
);

export {
  getModulesAsync,
  getScheduledCardsAsync,
  addModuleAsync,
  addFlashcardAsync,
  editFlashcardAsync,
  deleteFlashcardAsync,
  deleteModuleAsync,
};
