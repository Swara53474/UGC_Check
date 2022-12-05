const recognition = require("../controllers/recognition");

const router = require("express").Router();

router.post("/checkRecognition", recognition.check);
router.post("/add", recognition.add);
module.exports = router;