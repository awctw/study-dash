import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../utils";
import {
  getChatHistoryAsync,
  putChatHistoryAsync,
  renameChatAsync,
  getUserChatsAsync,
  groupChatAsync,
  inviteUserAsync,
  leaveChatAsync,
  respondToInviteAsync,
} from "./thunks";

const INIT_STATE = {
  chats: [],
  currentChat: [],
  getChatHistory: REQUEST_STATE.IDLE,
  putChatHistory: REQUEST_STATE.IDLE,
  getUserChats: REQUEST_STATE.IDLE,
  groupChat: REQUEST_STATE.IDLE,
  inviteUser: REQUEST_STATE.IDLE,
  respondToInvite: REQUEST_STATE.IDLE,
  leaveChat: REQUEST_STATE.IDLE,
  renameChat: REQUEST_STATE.IDLE,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState: INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChatHistoryAsync.pending, (state) => {
        state.getChatHistory = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getChatHistoryAsync.fulfilled, (state, action) => {
        state.getChatHistory = REQUEST_STATE.FULFILLED;
        state.currentChat = action.payload;
      })
      .addCase(getChatHistoryAsync.rejected, (state, action) => {
        state.getChatHistory = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(getUserChatsAsync.pending, (state) => {
        state.getUserChats = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getUserChatsAsync.fulfilled, (state, action) => {
        state.getUserChats = REQUEST_STATE.FULFILLED;
        state.chats = action.payload;
      })
      .addCase(getUserChatsAsync.rejected, (state, action) => {
        state.getUserChats = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(putChatHistoryAsync.pending, (state) => {
        state.putChatHistory = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(putChatHistoryAsync.fulfilled, (state, action) => {
        state.putChatHistory = REQUEST_STATE.FULFILLED;
        state.currentChat = action.payload;
      })
      .addCase(putChatHistoryAsync.rejected, (state, action) => {
        state.putChatHistory = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(groupChatAsync.pending, (state) => {
        state.groupChat = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(groupChatAsync.fulfilled, (state, action) => {
        state.groupChat = REQUEST_STATE.FULFILLED;
        state.chats.push(action.payload);
      })
      .addCase(groupChatAsync.rejected, (state, action) => {
        state.groupChat = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(inviteUserAsync.pending, (state) => {
        state.inviteUser = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(inviteUserAsync.fulfilled, (state, action) => {
        state.inviteUser = REQUEST_STATE.FULFILLED;
      })
      .addCase(inviteUserAsync.rejected, (state, action) => {
        state.inviteUser = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(respondToInviteAsync.pending, (state) => {
        state.respondToInvite = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(respondToInviteAsync.fulfilled, (state, action) => {
        state.respondToInvite = REQUEST_STATE.FULFILLED;
        if (action.payload) state.chats.push(action.payload);
      })
      .addCase(respondToInviteAsync.rejected, (state, action) => {
        state.respondToInvite = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(leaveChatAsync.pending, (state) => {
        state.leaveChat = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(leaveChatAsync.fulfilled, (state, action) => {
        state.leaveChat = REQUEST_STATE.FULFILLED;
        const chatToLeave = action.payload;
        const chatIdx = state.chats.findIndex(
          (chat) => chat.groupID === chatToLeave.groupID
        );
        state.chats.splice(chatIdx, 1);
      })
      .addCase(leaveChatAsync.rejected, (state, action) => {
        state.leaveChat = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(renameChatAsync.pending, (state) => {
        state.renameChat = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(renameChatAsync.fulfilled, (state, action) => {
        state.renameChat = REQUEST_STATE.FULFILLED;
        state.currentChat = action.payload;
      })
      .addCase(renameChatAsync.rejected, (state, action) => {
        state.renameChat = REQUEST_STATE.REJECTED;
        state.error = action.error;
      });
  },
});

export default chatSlice.reducer;
