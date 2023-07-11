import { createSlice } from "@reduxjs/toolkit";

import {
  getUserAsync,
  userLoginAsync,
  userLogoutAsync,
  userRegisterAsync,
  userEditAsync,
  groupChatAsync,
  inviteUserAsync,
  leaveChatAsync,
} from "./thunks";
import { REQUEST_STATE } from "../utils";

const user = JSON.parse(sessionStorage.getItem("user"));

const initialUserState = user
  ? { isLoggedIn: true, user, error: null }
  : { isLoggedIn: false, user: null, error: null };

const loginSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLoginAsync.pending, (state) => {
        state.login = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        if (action.payload.message !== undefined) {
          state.login = REQUEST_STATE.REJECTED;
          state.isLoggedIn = false;
          state.user = null;
          state.error = action.payload.message;
        } else {
          state.login = REQUEST_STATE.FULFILLED;
          state.isLoggedIn = true;
          state.user = action.payload;
        }
      })
      .addCase(userLoginAsync.rejected, (state, action) => {
        state.login = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(userLogoutAsync.pending, (state) => {
        state.logout = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(userLogoutAsync.fulfilled, (state, action) => {
        state.logout = REQUEST_STATE.FULFILLED;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(userLogoutAsync.rejected, (state, action) => {
        state.logout = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(userRegisterAsync.pending, (state) => {
        state.register = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(userRegisterAsync.fulfilled, (state, action) => {
        if (action.payload.message !== undefined) {
          state.register = REQUEST_STATE.REJECTED;
          state.isLoggedIn = false;
          state.user = null;
          state.error = action.payload.message;
        } else {
          state.register = REQUEST_STATE.FULFILLED;
          state.isLoggedIn = true;
          state.user = action.payload;
        }
      })
      .addCase(userRegisterAsync.rejected, (state, action) => {
        state.register = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(userEditAsync.pending, (state) => {
        state.edit = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(userEditAsync.fulfilled, (state, action) => {
        if (action.payload.message !== undefined) {
          state.edit = REQUEST_STATE.REJECTED;
          state.isLoggedIn = true;
          state.error = action.payload.message;
        } else {
          state.edit = REQUEST_STATE.FULFILLED;
          state.isLoggedIn = true;
          state.user = action.payload;
        }
      })
      .addCase(userEditAsync.rejected, (state, action) => {
        state.edit = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(groupChatAsync.pending, (state) => {
        state.groupChat = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(groupChatAsync.fulfilled, (state, action) => {
        state.groupChat = REQUEST_STATE.FULFILLED;
        state.user = action.payload;
      })
      .addCase(groupChatAsync.rejected, (state, action) => {
        state.groupChat = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(inviteUserAsync.pending, (state) => {
        state.invite = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(inviteUserAsync.fulfilled, (state, action) => {
        state.invite = REQUEST_STATE.FULFILLED;
      })
      .addCase(inviteUserAsync.rejected, (state, action) => {
        state.invite = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(getUserAsync.pending, (state) => {
        state.getUser = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.getUser = REQUEST_STATE.FULFILLED;
        state.user = action.payload;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.getUser = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(leaveChatAsync.pending, (state) => {
        state.leaveChat = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(leaveChatAsync.fulfilled, (state, action) => {
        state.leaveChat = REQUEST_STATE.FULFILLED;
        state.user = action.payload;
      })
      .addCase(leaveChatAsync.rejected, (state, action) => {
        state.leaveChat = REQUEST_STATE.REJECTED;
        state.error = action.error;
      });
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
