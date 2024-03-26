const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routes/userRouter");

const app = express();

const ratelimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 7,
  message: "Please wait or try again later",
});

app.use(ratelimiter);
app.use(xssClean());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.get("/getData", (req, res) => {
  res.status(200).send({ message: "I am from backend " });
});

// Client Error Handling
app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

// Server Error Handling
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
