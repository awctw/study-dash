import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import services from "./services";

const getCategoryListAsync = createAsyncThunk(
  actionTypes.GET_CATEGORY_LIST,
  async (userID) => {
    return await services.getCategories(userID);
  }
);

const deleteCategoryAsync = createAsyncThunk(
  actionTypes.DELETE_CATEGORY,
  async (categoryID) => {
    return await services.deleteCategory(categoryID);
  }
);

const getTODOListAsync = createAsyncThunk(
  actionTypes.GET_TODO_LIST,
  async ({ userID, categoryID }) => {
    return await services.getTODOList(userID, categoryID);
  }
);

const getTODOItemAsync = createAsyncThunk(
  actionTypes.GET_TODO_ITEM,
  async (itemID) => {
    return await services.getTODOItem(itemID);
  }
);

const addTODOItemAsync = createAsyncThunk(
  actionTypes.ADD_TODO_ITEM,
  async (item) => {
    return await services.addTODOItem(item);
  }
);

const editTODOItemAsync = createAsyncThunk(
  actionTypes.EDIT_TODO_ITEM,
  async ({ itemID, item }) => {
    // Set the response as the payload of the fulfilled action
    return await services.editTODOItem(itemID, item);
  }
);

const deleteTODOItemAsync = createAsyncThunk(
  actionTypes.DEL_TODO_ITEM,
  async (itemID) => {
    return await services.deleteTODOItem(itemID);
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
