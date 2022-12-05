//User Model
const User = require("../schema/users");

const { body, validationResult } = require("express-validator");

// registration
const registrationAuthRules = () => {
  return [
    body("email")
      .isEmail()
      .custom(async (email) => {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("Email already in use");
        }
      }),
    body("password").isAlphanumeric().isLength({ min: 6 }),
  ];
};

const validateRegistration = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};

// Login
const loginAuthRules = () => {
  return [
    body("email")
      .isEmail()
      .custom(async (email) => {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
          throw new Error("Try to login with correct credentials");
        }
      }),
    // body("password").isAlphanumeric().isLength({ min: 6 }),
    body("password").isLength({ min: 6 }).matches(/^[A-Za-z0-9 .,'!&@]+$/),
  ];
};

const validateLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};

module.exports = {
  registrationAuthRules,
  validateRegistration,
  loginAuthRules,
  validateLogin
};
