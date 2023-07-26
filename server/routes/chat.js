var express = require("express");
var router = express.Router();
const {
  getChatHistory,
  putChatHistory,
  renameChat,
  groupChat,
  inviteUser,
  leaveChat,
  getUserChats,
} = require("../controllers/chat.controller");

router.get("/:groupID", getChatHistory);

router.get("/userChats/:username", getUserChats);

router.post("/", groupChat);

router.put("/", putChatHistory);

router.patch("/inviteUser", inviteUser);

router.patch("/leaveChat", leaveChat);

router.patch("/:groupID", renameChat);

module.exports = router;
