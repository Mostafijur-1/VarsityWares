const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const ErrorHandler = require("./middleware/error");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const { errorResponse } = require("./controller/responseHandler");
const userRouter = require("./routes/userRouter");

const shop = require("./controller/shop");
const product = require("./controller/product");
// const event = require("./controller/event");
// const coupon = require("./controller/coupounCode");
// const payment = require("./controller/payment");
const order = require("./controller/order");
// const conversation = require("./controller/conversation");
// const message = require("./controller/message");
// const withdraw = require("./controller/withdraw");

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
// app.use("/api/conversation", conversation);
// app.use("/api/message", message);
app.use("/api/order", order);
app.use("/api/shop", shop);
app.use("/api/product", product);
// app.use("/api/event", event);
// app.use("/api/coupon", coupon);
// app.use("/api/payment", payment);
// app.use("/api/withdraw", withdraw);
// app.use("/api/bkash", paymentRouter);
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
