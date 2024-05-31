const express = require("express");
const varsityRouter = express.Router();

const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");
const runValidation = require("../validators");
const { validateVarsity } = require("../validators/varsity");
const {
  handleCreateVarsity,
  handleGetVarsity,
  handleUpdateVarsity,
  handleDeleteVarsity,
  handleGetVarsities,
} = require("../controller/varsityController");

varsityRouter.post(
  "/",
  isLoggedIn,
  isAdmin,
  validateVarsity,
  runValidation,
  handleCreateVarsity
);

varsityRouter.get("/", handleGetVarsities);
varsityRouter.get("/:slug", handleGetVarsity);
varsityRouter.put(
  "/:slug",
  isLoggedIn,
  isAdmin,
  validateVarsity,
  runValidation,
  handleUpdateVarsity
);
varsityRouter.delete("/:slug", isLoggedIn, isAdmin, handleDeleteVarsity);

module.exports = varsityRouter;
