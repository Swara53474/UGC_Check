const fa = require("../../controllers/fa/adminDetails");

const router = require("express").Router();

router.post("/details/", fa.create);
router.get("/details/edit", fa.edit);
router.put("/details/", fa.update);
router.get("/details/show", fa.show);

module.exports = router;
