var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var authRouter = require("./routes/auth");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.use(
  cookieSession({
    name: "test-session",
    secret: "COOKIE_SECRET",
    httpOnly: true,
  })
);

const db = require("./models");

db.mongoose
  .connect(
    `mongodb+srv://test:9E366LSCYOIfuqSm@cluster0.pabyt.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

module.exports = app;
