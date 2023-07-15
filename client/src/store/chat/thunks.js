import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import chatService from "./service";

const getChatHistoryAsync = createAsyncThunk(
  actionTypes.GET_CHATHISTORY,
  async (groupID) => {
    return await chatService.getChatHistory(groupID);
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

export {
  getChatHistoryAsync,
  putChatHistoryAsync,
  postChatHistoryAsync,
  renameChatAsync,
};
