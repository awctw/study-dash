const Chat = require("../models/chat.model");
const db = require("../models");
const { sendNotification } = require("../utils/notify");
const User = db.user;

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

const putChatHistory = async (req, res, next) => {
  const { groupID, newMessage, username } = req.body;

  const chat = await Chat.findOne({ groupID });

  chat.history.push(newMessage);

  // retrieve all target user tokens for this notif (a join b/w chat & users)
  await User.find({
    username: { $in: chat.users }
  })
    .then((users) => {
      const tokenList = users.reduce((list, user) => {

        // can't send notif to the sender of this message
        if (user.firebaseToken && user.username !== username) {
          list.push(user.firebaseToken);
        }

        return list;
      }, []);

      if (tokenList.length > 0) {
        sendNotification(tokenList, {
          title: newMessage.username,
          body: newMessage.message,
        });
      }

    })
    .catch((err) => {
      console.log("unable to send notifs: ", err);
    });

  await Chat.findOneAndUpdate(
    { groupID },
    { history: chat.history },
    { new: true }
  )
    .then((result) => {
      res.status(200).send(result);
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

const groupChat = async (req, res) => {
  const { username, groupID, chatName } = req.body;

  const chat = new Chat({
    history: [],
    groupID: groupID,
    name: chatName,
    users: [username]
  });

  await chat.save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });

};

const inviteUser = async (req, res) => {
  const { username, groupID } = req.body;

  const foundUser = await User.findOne({ username });

  if (foundUser === null) {
    return res.status(400).send("Username not found!");
  }

  await Chat.findOne({ groupID })
    .then((chat) => {
      // no need to update, user already exists
      if (chat.users.indexOf(foundUser.username) !== -1) {
        return res.status(200).send(chat);
      }

      if (foundUser.firebaseToken) {
        sendNotification([foundUser.firebaseToken], {
          title: "You have an invitation",
          body: `You have been invited to group chat, ${chat.name}` 
        });
      }

      chat.users.push(foundUser.username);
      chat.save();

      res.status(200).send(chat);
    })
    .catch((err) => {
      res.status(500).send(err);
    });

};

const leaveChat = async (req, res, next) => {
  const { username, groupID } = req.body;

  const foundChat = await Chat.findOne({ groupID });

  const userIndex = foundChat.users.indexOf(username);

  // if chat exists remove it
  if (userIndex > -1) {
    foundChat.users.splice(userIndex, 1);
  }

  await foundChat.save()
    .then((chat) => {
      res.status(200).send(chat);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getUserChats = async (req, res, next) => {
  const username = req.params.username;

  await Chat.find({
    users: { $in: [username] }
  })
    .then((chats) => {
      res.status(200).send(chats);
    })
    .catch((err) => {
      res.status(500).send(err);
    });

}

module.exports = {
  getChatHistory,
  putChatHistory,
  groupChat,
  renameChat,
  inviteUser,
  leaveChat,
  getUserChats,
};
