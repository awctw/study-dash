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
  postChatHistory,
  putChatHistory,
  renameChat,
};

export default exports;
