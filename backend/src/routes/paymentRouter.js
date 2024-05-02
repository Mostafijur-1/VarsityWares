const express = require("express");
const paymentRouter = express.Router();

const grantToken = require("../utils/grantToken");
const {
  createPayment,
  bkashCallback,
} = require("../controller/paymentController");

paymentRouter.use(grantToken);

paymentRouter.post("/create", createPayment);

paymentRouter.get("/callback", bkashCallback);

module.exports = paymentRouter;
