const express = require("express");
const {
  processRegister,
  handleActivate,
  getUsers,
  handleLogin,
  handleLogout,
} = require("../controller/userController");
const uploadProductImage = require("../middlewares/uploadProductImage");
const { isAuthenticated } = require("../middleware/auth");
const userRouter = express.Router();

userRouter.post(
  "/create-user",
  uploadProductImage.single("avatar"),
  processRegister
);
userRouter.post("/activation", handleActivate);
userRouter.post("/login-user", handleLogin);
userRouter.post("/logout", handleLogout);
userRouter.get("/getuser", isAuthenticated, getUsers);

// userRouter.get("/:id([0-9a-fA-F]{24})", getUserById);
// userRouter.delete("/:id([0-9a-fA-F]{24})", deleteUserById);
// userRouter.put("/:id([0-9a-fA-F]{24})", updateUserById);

module.exports = userRouter;
