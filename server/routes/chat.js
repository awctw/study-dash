var express = require("express");
var router = express.Router();
const {
  getChatHistory,
  putChatHistory,
  postChatHistory,
  renameChat,
} = require("../controllers/chat.controller");

router.get("/:groupID", getChatHistory);

router.post("/", postChatHistory);

router.put("/", putChatHistory);

router.patch("/:groupID", renameChat);

module.exports = router;
