const user = require("../controllers/user");

const {
  registrationAuthRules,
  validateRegistration,
  loginAuthRules,
  validateLogin,
} = require("../validations/auth");

const router = require("express").Router();

router.post("/register", user.register);
router.post("/login", loginAuthRules(), validateLogin, user.login);
router.post("/users/list", user.list);
router.post("/forgotPassword", user.forgotPassword);

module.exports = router;
