var express = require("express");
var router = express.Router();
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

// router.use(async function (req, res, next) {
//   res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
//   await next();
// });

router.post(
  "/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail],
  (req, res) => {
    controller.signup(req, res);
    return res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
  }
);

router.post("/signin", (req, res) => {
  controller.signin(req, res);
  return res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
});

router.post("/signout", (req, res) => {
  controller.signout(req, res);
  return res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
});

module.exports = router;
