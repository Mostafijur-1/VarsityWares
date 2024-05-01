const { body } = require("express-validator");

const validateUserRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 5, max: 40 })
    .withMessage("Username must be between 5 and 40 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{5,16}$/)
    .withMessage(
      "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 5-16 characters long."
    )
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  body("address").trim().notEmpty().withMessage("Address is required"),
  body("phone").trim().notEmpty().withMessage("Phone number is required"),
  body("image").optional().isString().withMessage("User image is optional"),
];
const validateUserLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password").trim().notEmpty().withMessage("password is required"),
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
};
