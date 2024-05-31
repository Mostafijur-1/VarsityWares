const { body } = require("express-validator");

const validateVarsity = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("varsity name is required")
    .isLength({ min: 2 })
    .withMessage("varsity name must be at least 2 characters"),
];

module.exports = { validateVarsity };
