var express = require("express");
var router = express.Router();
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

router.use(async function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  await next();
});

router.post(
  "/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail],
  controller.signup
);

router.post("/signin", controller.signin);

router.post("/signout", controller.signout);

router.put(
  "/edit",
  [verifySignUp.checkDuplicateUsernameOrEmail],
  controller.edit
);

router.get("/getUser/:userID", controller.getUser);

router.get("/invites/:userID", controller.getUserInvites);

module.exports = router;
