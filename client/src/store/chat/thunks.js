import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import chatService from "./service";

const getChatHistoryAsync = createAsyncThunk(
  actionTypes.GET_CHATHISTORY,
  async (groupID) => {
    return await chatService.getChatHistory(groupID);
  }
);

const getUserChatsAsync = createAsyncThunk(
  actionTypes.GET_USERCHATS,
  async (username) => {
    return await chatService.getUserChats(username);
  }
);

const postChatHistoryAsync = createAsyncThunk(
  actionTypes.POST_CHATHISTORY,
  async (history) => {
    return await chatService.postChatHistory(history);
  }
);

const putChatHistoryAsync = createAsyncThunk(
  actionTypes.PUT_CHATHISTORY,
  async (newChat) => {
    return await chatService.putChatHistory(newChat);
  }
);

const renameChatAsync = createAsyncThunk(
  actionTypes.PATCH_RENAMECHAT,
  async (chatInfo) => {
    return await chatService.renameChat(chatInfo);
  }
);

const groupChatAsync = createAsyncThunk(
  actionTypes.POST_GROUP_CHAT,
  async (chatInfo) => {
    return await chatService.groupChat(chatInfo);
  }
);

const inviteUserAsync = createAsyncThunk(
  actionTypes.PATCH_INVITE_USER,
  async (userInfo) => {
    return await chatService.inviteUser(userInfo.username, userInfo.groupID);
  }
);

const leaveChatAsync = createAsyncThunk(
  actionTypes.PATCH_LEAVECHAT,
  async (userInfo) => {
    return await chatService.leaveChat(userInfo);
  }
);

export {
  getChatHistoryAsync,
  getUserChatsAsync,
  putChatHistoryAsync,
  postChatHistoryAsync,
  renameChatAsync,
  groupChatAsync,
  inviteUserAsync,
  leaveChatAsync,
};
