const college = require("../controllers/college");

const router = require("express").Router();

router.get("/viewAll", college.viewall);
router.get("/viewApproved", college.viewApproved)

module.exports = router;