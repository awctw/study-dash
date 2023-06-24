const db = require("../models");
const User = db.user;

function validateEmail(email) {
  // Regular expression to check the email format Credit: ChatGPT
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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

    if (!validateEmail(req.body.email)) {
      return res.status(200).json({ message: "Invalid Email!" });
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
