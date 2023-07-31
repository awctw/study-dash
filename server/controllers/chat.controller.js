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

  console.log(newMessage);

  const chat = await Chat.findOne({ groupID });

  const msgFound = chat.history.find((msg) => msg.id === newMessage.id);

  if (!msgFound) {
    chat.history.push(newMessage);
  }

  // retrieve all target user tokens for this notif (a join b/w chat & users)
  await User.find({
    username: { $in: chat.users },
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
          title: `${newMessage.username} from ${chat.name}`,
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

  await chat
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const groupChat = async (req, res) => {
  const { username, groupID, chatName } = req.body;

  const chat = new Chat({
    history: [],
    groupID: groupID,
    name: chatName,
    users: [username],
  });

  await chat
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const sendUserInvite = async (req, res) => {
  const { username, groupID } = req.body;

  const foundUser = await User.findOne({ username });

  if (foundUser === null) {
    return res.status(400).send("Username not found!");
  }

  // we'll now actually return the user, since that's what we're updating
  await Chat.findOne({ groupID })
    .then(async (chat) => {
      const foundInvite = foundUser.invites.findIndex(
        (invite) => invite.groupID === groupID
      );

      // no need to send invite, if invitation already exists or user already exists in chat
      if (foundInvite !== -1 || chat.users.indexOf(foundUser.username) !== -1) {
        return res
          .status(200)
          .send(
            "Either the user is already in the chat or the invite has been already sent out"
          );
      }

      foundUser.invites.push({
        groupID: chat.groupID,
        chatName: chat.name,
      });

      if (foundUser.firebaseToken) {
        sendNotification([foundUser.firebaseToken], {
          title: "You have an invitation",
          body: `You have been invited to group chat, ${chat.name}`,
        });
      }

      await foundUser.save();

      res.status(200).send("Invite sent");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const inviteResponse = async (req, res, next) => {
  const { username, groupID, decision } = req.body;

  // First delete the invite
  const foundUser = await User.findOne({ username });

  if (foundUser === null) {
    return res.status(400).send("Username not found!");
  }

  // find and remove invite
  const inviteIndex = foundUser.invites.findIndex(
    (invite) => invite.groupID === groupID
  );

  if (inviteIndex === -1) {
    return res.status(400).send("Invite not found!");
  }

  foundUser.invites.splice(inviteIndex, 1);

  await foundUser.save();

  // if user declined the invite, no need to proceed..
  if (decision === "declined") {
    return res.status(200).send("");
  }

  // then push user to chat
  await Chat.findOne({ groupID })
    .then((chat) => {
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

  await foundChat
    .save()
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
    users: { $in: [username] },
  })
    .then((chats) => {
      res.status(200).send(chats);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  getChatHistory,
  putChatHistory,
  groupChat,
  renameChat,
  sendUserInvite,
  inviteResponse,
  leaveChat,
  getUserChats,
};
