const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    userID: req.body.userID,
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    firebaseToken: req.body.firebaseToken,
    password: bcrypt.hashSync(req.body.password, 8),
    invites: [],
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    var token = jwt.sign({ id: user.userID }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    req.session.token = token;

    res.status(200).send({
      userID: user.userID,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      invites: user.invites,
      accessToken: token,
    });
  });
};

exports.signin = async (req, res) => {
  User.findOne({
    username: req.body.username,
  }).exec(async (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(200).send({ message: "Username Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(200).send({ message: "Invalid Password!" });
    }

    var token = jwt.sign({ id: user.userID }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    req.session.token = token;

    // update firebase token on sign up
    user.firebaseToken = req.body.fbToken;

    await user.save();

    res.status(200).send({
      userID: user.userID,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessToken: token,
      invites: user.invites,
      firebaseToken: user.firebaseToken
    });
  });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    
    // clear firebase token to ensure users only receive notifs if they're logged in
    const founduser = await User.findOne({ username: req.body.username });

    founduser.firebaseToken = "";

    await founduser.save()
      .then(() => {
        return res.status(200).send({ message: "You've been signed out!" });
      });

  } catch (err) {
    this.next(err);
  }
};

exports.edit = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { userID: req.body.userID },
    {
      userID: req.body.userID,
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    },
    { new: true, upsert: false }
  );

  var token = jwt.sign({ id: user.userID }, config.secret, {
    expiresIn: 86400, // 24 hours
  });
  req.session.token = token;

  res.status(200).send({
    userID: user.userID,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    invites: user.invites,
    accessToken: token,
  });
};

exports.getUser = async (req, res, next) => {
  await User.findOne({ userID: req.params.userID })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.getUserInvites = async (req, res, next) => {
  await User.findOne({ userID: req.params.userID })
    .then((user) => {
      res.status(200).send(user.invites);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}
