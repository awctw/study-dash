const db = require("../models");
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check username
    const userByUsername = await User.findOne({
      username: req.body.username,
    }).exec();

    if (userByUsername) {
      res.status(200).send({ message: "Username is already in use!" });
      return;
    }

    // Check email
    const userByEmail = await User.findOne({ email: req.body.email }).exec();
    if (userByEmail) {
      res.status(200).send({ message: "Email is already in use!" });
      return;
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
