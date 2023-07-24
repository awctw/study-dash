var express = require("express");
var router = express.Router();
const {
  getChatHistory,
  putChatHistory,
  renameChat,
  groupChat,
  sendUserInvite,
  leaveChat,
  getUserChats,
  inviteResponse,
} = require("../controllers/chat.controller");

router.get("/:groupID", getChatHistory);

router.get("/userChats/:username", getUserChats);

router.post("/", groupChat);

router.put("/", putChatHistory);

router.patch("/inviteUser", sendUserInvite);

router.patch("/respondToInvite", inviteResponse);

router.patch("/leaveChat", leaveChat);

router.patch("/:groupID", renameChat);

module.exports = router;
