var express = require("express");
var router = express.Router();
const {
  getChatHistory,
  putChatHistory,
  postChatHistory,
} = require("../controllers/chat.controller");

router.get("/:groupID", getChatHistory);

router.post("/", postChatHistory);

router.put("/", putChatHistory);

module.exports = router;
