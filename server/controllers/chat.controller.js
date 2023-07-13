const Chat = require("../models/chat.model");

const getChatHistory = async (req, res, next) => {
  await Chat.findOne({ groupID: req.params.groupID })
    .then((result) => {
      if (!result) {
        res.status(200).send({
          groupID: req.params.groupID,
          history: req.body.history,
        });
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const postChatHistory = async (req, res, next) => {
  const chat = new Chat({
    groupID: req.body.groupID,
    history: [],
    name: req.body.name,
  });

  await chat
    .save()
    .then(() => {
      res.status(200).send(chat);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const putChatHistory = async (req, res, next) => {
  const { groupID, newMessage } = req.body;

  const chat = await Chat.findOne({ groupID });

  chat.history.push(newMessage);

  await Chat.findOneAndUpdate(
    { groupID },
    { history: chat.history },
    { new: true }
  )
    .then((result) => {
      res.status(200).send({
        groupID: req.body.groupID,
        history: result.history,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const renameChat = async (req, res, next) => {
  const groupID = req.params.groupID;

  const chat = await Chat.findOne({ groupID });

  chat.name = req.body.name;

  await chat.save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

module.exports = {
  getChatHistory,
  putChatHistory,
  postChatHistory,
  renameChat,
};
