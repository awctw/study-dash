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

router.put("/groupChat", controller.groupChat);

router.put("/inviteUser", controller.inviteUser);

router.get("/getUser/:userID", controller.getUser);

router.patch("/leaveChat", controller.leaveChat);

router.get("/members/:groupID", controller.getChatMembers);

module.exports = router;
