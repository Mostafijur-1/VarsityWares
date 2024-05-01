const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routes/userRouter");
const seedRouter = require("./routes/seedRouter");
const { errorResponse } = require("./controller/responseHandler");
const authRouter = require("./routes/authRouter");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
const paymentRouter = require("./routes/paymentRouter");
const app = express();

const ratelimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 7,
  message: "Please wait or try again later",
});

app.use(cookieParser());
app.use(ratelimiter);
app.use(xssClean());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/seed", seedRouter);
app.get("/getData", (req, res) => {
  res.status(200).send({ message: "I am from backend " });
});

// Client Error Handling
app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

// Server Error Handling
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

module.exports = app;
