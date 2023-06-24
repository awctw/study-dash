var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var authRouter = require("./routes/auth");
var dbConfig = require("./config/db.config");
var TODOListRouter = require('./routes/TODOList');
var flashcardRouter = require('./routes/flashcards');
var habitRouter = require('./routes/habits');
var chartSettingsRouter = require('./routes/chartSettings');

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cookieSession({
    name: "test-session",
    secret: "COOKIE_SECRET",
    httpOnly: true,
  })
);

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use('/api/TODOList', TODOListRouter);
app.use("/flashcards", flashcardRouter);
app.use("/habits", habitRouter);
app.use("/chartSettings", chartSettingsRouter);

const db = require("./models");

db.mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

module.exports = app;
