const { body } = require("express-validator");

const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 5 })
    .withMessage("Category name must be at least 5 characters"),
];

module.exports = { validateCategory };
