const express = require("express");
const {
  handleLogin,
  handleLogout,
  handleUserStatus,
  handleRefreshToken,
  handleProtectedRoute,
} = require("../controller/authController");
const { isLoggedOut, isLoggedIn, isAdmin } = require("../middlewares/auth");
const { validateUserLogin } = require("../validators/auth");
const runValidation = require("../validators");

const authRouter = express.Router();

authRouter.post(
  "/login",
  validateUserLogin,
  runValidation,
  isLoggedOut,
  handleLogin
);
authRouter.post("/logout", isLoggedIn, handleLogout);
authRouter.get("/refresh-token", handleRefreshToken);
authRouter.get("/protected", handleProtectedRoute);
authRouter.put(
  "/user-status/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  isAdmin,
  handleUserStatus
);

module.exports = authRouter;
