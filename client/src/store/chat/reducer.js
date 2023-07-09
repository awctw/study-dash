import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../utils";
import {
  getChatHistoryAsync,
  putChatHistoryAsync,
  postChatHistoryAsync,
} from "./thunks";

const INIT_STATE = {
  chat: [],
  getChatHistory: REQUEST_STATE.IDLE,
  putChatHistory: REQUEST_STATE.IDLE,
  postChatHistory: REQUEST_STATE.IDLE,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState: INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChatHistoryAsync.pending, (state) => {
        state.getModules = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getChatHistoryAsync.fulfilled, (state, action) => {
        state.getModules = REQUEST_STATE.FULFILLED;
        state.chat = action.payload;
      })
      .addCase(getChatHistoryAsync.rejected, (state, action) => {
        state.getModules = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(postChatHistoryAsync.pending, (state) => {
        state.getModules = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(postChatHistoryAsync.fulfilled, (state, action) => {
        state.getModules = REQUEST_STATE.FULFILLED;
        state.chat.groupID = action.payload.groupID;
      })
      .addCase(postChatHistoryAsync.rejected, (state, action) => {
        state.getModules = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(putChatHistoryAsync.pending, (state) => {
        state.getModules = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(putChatHistoryAsync.fulfilled, (state, action) => {
        state.getModules = REQUEST_STATE.FULFILLED;
        state.chat = action.payload;
      })
      .addCase(putChatHistoryAsync.rejected, (state, action) => {
        state.getModules = REQUEST_STATE.REJECTED;
        state.error = action.error;
      });
  },
});

export default chatSlice.reducer;
