const express = require("express");
const userRouter = express.Router();

const { getUser } = require("../controller/userController");

userRouter.get("/", getUser);

module.exports = userRouter;
