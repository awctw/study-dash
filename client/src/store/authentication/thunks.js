import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import AuthService from "./AuthService";
import UserService from "./UserService";

export const getUserAsync = createAsyncThunk(actionTypes.GET_USER, async () => {
  return await UserService.getUserBoard();
});

export const userLogoutAsync = createAsyncThunk(
  actionTypes.POST_USER_SIGNOUT,
  async (user) => {
    return await AuthService.logout(user.username, user.password);
  }
);

export const userLoginAsync = createAsyncThunk(
  actionTypes.POST_USER_SIGNIN,
  async (user) => {
    return await AuthService.login(user.userID, user.username, user.password);
  }
);

export const userRegisterAsync = createAsyncThunk(
  actionTypes.POST_USER_SIGNUP,
  async (user) => {
    return await AuthService.register(
      user.userID,
      user.groupID,
      user.username,
      user.firstName,
      user.lastName,
      user.email,
      user.password
    );
  }
);

export const userEditAsync = createAsyncThunk(
  actionTypes.PUT_USER_EDIT,
  async (user) => {
    return await AuthService.edit(
      user.userID,
      user.username,
      user.firstName,
      user.lastName,
      user.email
    );
  }
);

export const groupChatAsync = createAsyncThunk(
  actionTypes.PUT_GROUP_CHAT,
  async (user) => {
    return await AuthService.groupChat(user.userID, user.groupID);
  }
);
