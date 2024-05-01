const { body } = require("express-validator");

const validateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 5 })
    .withMessage("Product name must be at least 5 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 5 })
    .withMessage("Product description must be at least 5 characters"),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("Product price is required")
    .isFloat({ min: 0 })
    .withMessage("Product price must be positive"),
  body("quantity")
    .trim()
    .notEmpty()
    .withMessage("Product quantity is required")
    .isFloat({ min: 1 })
    .withMessage("Product quantity must positive"),
  body("sold")
    .trim()
    .notEmpty()
    .withMessage("Product sold quantity is required")
    .isFloat({ min: 0 })
    .withMessage("Product sold quantity must positive"),
  body("shipping")
    .optional()
    .trim()
    .isFloat({ min: 0 })
    .withMessage("Product shipping cost must positive"),
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Product category is required"),
  body("image").optional().isString().withMessage("User image is optional"),
];

const validateProductUpdate = [
  body("name")
    .trim()
    .optional()
    .isLength({ min: 5 })
    .withMessage("Product name must be at least 5 characters"),
  body("description")
    .trim()
    .optional()
    .isLength({ min: 5 })
    .withMessage("Product description must be at least 5 characters"),
  body("price")
    .trim()
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Product price must be positive"),
  body("quantity")
    .trim()
    .optional()
    .isFloat({ min: 1 })
    .withMessage("Product quantity must positive"),
  body("sold")
    .trim()
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Product sold quantity must positive"),
  body("shipping")
    .optional()
    .trim()
    .isFloat({ min: 0 })
    .withMessage("Product shipping cost must positive"),
  body("category").trim(),

  body("image").optional().isString(),
];

module.exports = { validateProduct, validateProductUpdate };
