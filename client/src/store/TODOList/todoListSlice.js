import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../utils";
import thunk from "./thunk";

// TODOListSlice sets up the initial redux state, defines reducers for adding,
// editing, and deleting TODOItems

const INITIAL_STATE = {
  categories: [],
  TODOList: [],
  currentTODOItem: {},
  error: null,
  fetchCategoryList: false,
  fetchTODOList: false,
  getCategories: REQUEST_STATE.IDLE,
  deleteCategory: REQUEST_STATE.IDLE,
  getTODOList: REQUEST_STATE.IDLE,
  getTODOItem: REQUEST_STATE.IDLE,
  addTODOItem: REQUEST_STATE.IDLE,
  editTODOItem: REQUEST_STATE.IDLE,
  deleteTODOItem: REQUEST_STATE.IDLE,
};

const TODOListSlice = createSlice({
  name: "todoList",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(thunk.getCategoryListAsync.pending, (state) => {
        state.getCategories = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(thunk.getCategoryListAsync.fulfilled, (state, action) => {
        state.getCategories = REQUEST_STATE.FULFILLED;
        state.categories = action.payload;
      })
      .addCase(thunk.getCategoryListAsync.rejected, (state, action) => {
        state.getCategories = REQUEST_STATE.REJECTED;
        state.error = action.error.message;
      })
      .addCase(thunk.deleteCategoryAsync.pending, (state) => {
        state.deleteCategory = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(thunk.deleteCategoryAsync.fulfilled, (state) => {
        state.deleteCategory = REQUEST_STATE.FULFILLED;
        state.fetchCategoryList = !state.fetchCategoryList;
        state.fetchTODOList = !state.fetchTODOList;
      })
      .addCase(thunk.deleteCategoryAsync.rejected, (state, action) => {
        state.deleteCategory = REQUEST_STATE.REJECTED;
        state.error = action.error.message;
      })
      .addCase(thunk.getTODOListAsync.pending, (state) => {
        state.getTODOList = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(thunk.getTODOListAsync.fulfilled, (state, action) => {
        state.getTODOList = REQUEST_STATE.FULFILLED;
        state.TODOList = action.payload;
      })
      .addCase(thunk.getTODOListAsync.rejected, (state, action) => {
        state.getTODOList = REQUEST_STATE.REJECTED;
        state.error = action.error.message;
      })
      .addCase(thunk.getTODOItemAsync.pending, (state) => {
        state.getTODOItem = REQUEST_STATE.PENDING;
        state.error = null;
        state.currentTODOItem = {};
      })
      .addCase(thunk.getTODOItemAsync.fulfilled, (state, action) => {
        state.getTODOItem = REQUEST_STATE.FULFILLED;
        state.currentTODOItem = action.payload;
      })
      .addCase(thunk.getTODOItemAsync.rejected, (state, action) => {
        state.getTODOItem = REQUEST_STATE.REJECTED;
        state.error = action.error.message;
      })
      .addCase(thunk.addTODOItemAsync.pending, (state) => {
        state.addTODOItem = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(thunk.addTODOItemAsync.fulfilled, (state) => {
        state.addTODOItem = REQUEST_STATE.FULFILLED;
        state.fetchTODOList = !state.fetchTODOList;
        state.fetchCategoryList = !state.fetchCategoryList;
      })
      .addCase(thunk.addTODOItemAsync.rejected, (state, action) => {
        state.addTODOItem = REQUEST_STATE.REJECTED;
        state.error = action.error.message;
      })
      .addCase(thunk.editTODOItemAsync.pending, (state) => {
        state.editTODOItem = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(thunk.editTODOItemAsync.fulfilled, (state) => {
        state.editTODOItem = REQUEST_STATE.FULFILLED;
        state.fetchTODOList = !state.fetchTODOList;
        state.fetchCategoryList = !state.fetchCategoryList;
      })
      .addCase(thunk.editTODOItemAsync.rejected, (state, action) => {
        state.editTODOItem = REQUEST_STATE.REJECTED;
        state.error = action.error.message;
      })
      .addCase(thunk.deleteTODOItemAsync.pending, (state) => {
        state.deleteTODOItem = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(thunk.deleteTODOItemAsync.fulfilled, (state) => {
        state.deleteTODOItem = REQUEST_STATE.FULFILLED;
        state.fetchTODOList = !state.fetchTODOList;
      })
      .addCase(thunk.deleteTODOItemAsync.rejected, (state, action) => {
        state.deleteTODOItem = REQUEST_STATE.REJECTED;
        state.error = action.error.message;
      });
  },
});

// The TODOListSlice.reducer is exported as the default export, representing the reducer
// function for this slice.
export default TODOListSlice.reducer;
