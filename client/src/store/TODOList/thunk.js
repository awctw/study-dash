import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import services from "./services";

const getCategoryListAsync = createAsyncThunk(
  actionTypes.GET_CATEGORY_LIST,
  async () => {
    try {
      return await services.getCategories();
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const deleteCategoryAsync = createAsyncThunk(
  actionTypes.DELETE_CATEGORY,
  async (category) => {
    try {
      return await services.deleteCategory(category);
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const getTODOListAsync = createAsyncThunk(
  actionTypes.GET_TODO_LIST,
  async () => {
    try {
      return await services.getTODOList();
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const getTODOItemAsync = createAsyncThunk(
  actionTypes.GET_TODO_ITEM,
  async (itemID) => {
    try {
      return await services.getTODOItem(itemID);
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const addTODOItemAsync = createAsyncThunk(
  actionTypes.ADD_TODO_ITEM,
  async (item) => {
    try {
      return await services.addTODOItem(item);
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const editTODOItemAsync = createAsyncThunk(
  actionTypes.EDIT_TODO_ITEM,
  async ({ itemID, item }) => {
    try {
      return await services.editTODOItem(itemID, item); // Set the response as the payload of the fulfilled action
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const deleteTODOItemAsync = createAsyncThunk(
  actionTypes.DEL_TODO_ITEM,
  async (itemID) => {
    try {
      return await services.deleteTODOItem(itemID);
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export default {
  getCategoryListAsync,
  deleteCategoryAsync,
  getTODOListAsync,
  getTODOItemAsync,
  addTODOItemAsync,
  editTODOItemAsync,
  deleteTODOItemAsync,
};
