const hei = require("../../controllers/hei/adminDetails");

const router = require("express").Router();

router.post("/details/", hei.create);
router.get("/details/edit", hei.edit);
router.put("/details/", hei.update);
router.get("/details/show", hei.show);

module.exports = router;
