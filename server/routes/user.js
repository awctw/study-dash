var express = require("express");
var router = express.Router();
const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

router.use(async function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  await next();
});

router.get("/", [authJwt.verifyToken], controller.userBoard);

module.exports = router;
