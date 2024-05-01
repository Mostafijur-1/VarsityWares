const express = require("express");
const {
  handleCreateProduct,
  handleGetProducts,
  handleGetProduct,
  handleDeleteProduct,
  handleUpdateProduct,
} = require("../controller/productController");
const uploadProductImage = require("../middlewares/uploadProductImage");
const {
  validateProduct,
  validateProductUpdate,
} = require("../validators/product");
const runValidation = require("../validators");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");

const productRouter = express.Router();

productRouter.post(
  "/",
  uploadProductImage.single("image"),
  isLoggedIn,
  isAdmin,
  validateProduct,
  runValidation,
  handleCreateProduct
);
productRouter.get("/", handleGetProducts);
productRouter.get("/:slug", handleGetProduct);
productRouter.delete("/:slug", handleDeleteProduct);
productRouter.put(
  "/:slug",
  uploadProductImage.single("image"),
  isLoggedIn,
  isAdmin,
  validateProductUpdate,
  runValidation,
  handleUpdateProduct
);

module.exports = productRouter;
