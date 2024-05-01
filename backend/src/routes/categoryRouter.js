const express = require("express");
const categoryRouter = express.Router();

const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");
const runValidation = require("../validators");
const {
  handleCreateCategory,
  handleGetCategories,
  handleGetCategory,
  handleUpdateCategory,
  handleDeleteCategory,
} = require("../controller/categoryController");
const { validateCategory } = require("../validators/category");

categoryRouter.post(
  "/",
  isLoggedIn,
  isAdmin,
  validateCategory,
  runValidation,
  handleCreateCategory
);

categoryRouter.get("/", handleGetCategories);
categoryRouter.get("/:slug", handleGetCategory);
categoryRouter.put(
  "/:slug",
  isLoggedIn,
  isAdmin,
  validateCategory,
  runValidation,
  handleUpdateCategory
);
categoryRouter.delete("/:slug", isLoggedIn, isAdmin, handleDeleteCategory);

module.exports = categoryRouter;
