const express = require("express");
const morgan = require("morgan");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3000",
  "https://varsitywares.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./.env",
  });
}

// import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const withdraw = require("./controller/withdraw");

app.use("/api/user", user);
app.use("/api/conversation", conversation);
app.use("/api/message", message);
app.use("/api/order", order);
app.use("/api/shop", shop);
app.use("/api/product", product);
app.use("/api/event", event);
app.use("/api/coupon", coupon);
app.use("/api/payment", payment);
app.use("/api/withdraw", withdraw);

app.use(ErrorHandler);

module.exports = app;
