const express = require("express");
const categoryRouter = express.Router();

const { isAdmin } = require("../middleware/auth");
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

  isAdmin,
  validateCategory,
  runValidation,
  handleCreateCategory
);

categoryRouter.get("/", handleGetCategories);
categoryRouter.get("/:slug", handleGetCategory);
categoryRouter.put(
  "/:slug",
  isAdmin,
  validateCategory,
  runValidation,
  handleUpdateCategory
);
categoryRouter.delete("/:slug", isAdmin, handleDeleteCategory);

module.exports = categoryRouter;
