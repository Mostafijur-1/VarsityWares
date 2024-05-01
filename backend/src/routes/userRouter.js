const express = require("express");
const userRouter = express.Router();

const {
  getUsers,
  getUserById,
  deleteUserById,
  processRegister,
  activateUserAccount,
  updateUserById,
} = require("../controller/userController");

const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");
const { validateUserRegistration } = require("../validators/auth");
const runValidation = require("../validators");
const uploadUserImage = require("../middlewares/fileUpload");

userRouter.post(
  "/process-register",
  uploadUserImage.single("image"),
  validateUserRegistration,
  runValidation,
  isLoggedOut,
  processRegister
);
userRouter.post("/activate", isLoggedOut, activateUserAccount);
userRouter.get("/", isLoggedIn, isAdmin, getUsers);
userRouter.get("/:id([0-9a-fA-F]{24})", isLoggedIn, getUserById);
userRouter.delete("/:id([0-9a-fA-F]{24})", isLoggedIn, deleteUserById);
userRouter.put(
  "/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  uploadUserImage.single("image"),
  updateUserById
);

module.exports = userRouter;
