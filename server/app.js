const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const logger = require("morgan");
const cors = require("cors");

const dbConfig = require("./config/db.config");
const db = require("./models");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/Categories");
const TODOListRouter = require("./routes/TODOItems");
const flashcardRouter = require("./routes/flashcards");
const habitRouter = require("./routes/habits");
const chartSettingsRouter = require("./routes/chartSettings");
const timerSettingsRouter = require("./routes/timerSettings");

const app = express();

// Middleware
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

// Routes
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/TODOList", TODOListRouter);
app.use("/flashcards", flashcardRouter);
app.use("/habits", habitRouter);
app.use("/chartSettings", chartSettingsRouter);
app.use("/timerSettings", timerSettingsRouter);

// Connect to MongoDB
db.mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error:", err);
    throw new Error("Failed to connect to MongoDB. " + err.message);
  });

module.exports = app;
