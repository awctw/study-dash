import axios from "axios";

const URL = "http://localhost:8080/";

const getChatHistory = async (groupID) => {
  return await axios
    .get(URL + `chat/${groupID}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const getUserChats = async (username) => {
  return await axios
    .get(URL + `chat/userChats/${username}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const postChatHistory = async (history) => {
  return await axios
    .post(URL + `chat`, history)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const putChatHistory = async (newChat) => {
  return await axios
    .put(URL + `chat`, newChat)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const groupChat = async (chatInfo) => {
  return await axios
    .post(URL + `chat`, chatInfo)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const inviteUser = async (username, groupID) => {
  return await axios
    .patch(URL + "chat/inviteUser", {
      username,
      groupID,
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const leaveChat = async (userInfo) => {
  return await axios
    .patch(URL + "chat/leaveChat", userInfo)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const renameChat = async (chatInfo) => {
  return await axios
    .patch(URL + `chat/${chatInfo.groupID}`, {
      name: chatInfo.name,
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const exports = {
  getChatHistory,
  getUserChats,
  postChatHistory,
  putChatHistory,
  renameChat,
  groupChat,
  inviteUser,
  leaveChat,
};

export default exports;
