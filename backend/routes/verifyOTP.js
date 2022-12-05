const verifyOTP = require("../controllers/verifyOTP");

const router = require("express").Router();

router.post("/sendOTP", verifyOTP.sendOTP);
router.post("/checkOTP", verifyOTP.checkOTP);
router.post("/resendOTP", verifyOTP.resendOTP);

module.exports = router;
