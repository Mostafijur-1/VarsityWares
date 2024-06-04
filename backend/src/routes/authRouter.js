const express = require("express");
const {
  handleLogin,
  handleLogout,
  handleUserStatus,
  handleRefreshToken,
  handleProtectedRoute,
} = require("../controller/authController");
const { isAdmin } = require("../middleware/auth");
const { validateUserLogin } = require("../validators/auth");
const runValidation = require("../validators");

const authRouter = express.Router();

authRouter.post("/login", validateUserLogin, runValidation, handleLogin);
authRouter.post("/logout", handleLogout);
authRouter.get("/refresh-token", handleRefreshToken);
authRouter.get("/protected", handleProtectedRoute);
authRouter.put(
  "/user-status/:id([0-9a-fA-F]{24})",

  isAdmin,
  handleUserStatus
);

module.exports = authRouter;
