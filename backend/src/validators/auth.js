const { body } = require("express-validator");

const validateUserRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 40 })
    .withMessage("Username must be between 3 and 40 characters"),
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
];
const validateUserLogin = [
  body("phone").trim().notEmpty().withMessage("phone is required"),
  body("password").trim().notEmpty().withMessage("password is required"),
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
};
