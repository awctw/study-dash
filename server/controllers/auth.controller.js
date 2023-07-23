const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    userID: req.body.userID,
    groupID: req.body.groupID,
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    firebaseToken: req.body.firebaseToken,
    password: bcrypt.hashSync(req.body.password, 8),
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
      groupID: user.groupID,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessToken: token,
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
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

    res.status(200).send({
      userID: user.userID,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessToken: token,
    });
  });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    
    // clear firebase token
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
      groupID: req.body.groupID,
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
    groupID: user.groupID,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
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

exports.updateFirebaseToken = async (req, res, next) => {
  const { username, fbToken } = req.body;

  const founduser = await User.findOne({ username: username });

  if (!founduser) {
    return res.status(200).send({ message: "Username Not found." });
  }

  founduser.firebaseToken = fbToken;

  founduser.save()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
