const scheme = require("../../controllers/base_tables/scheme");

const router = require("express").Router();

router.get("/", scheme.index);
router.post("/", scheme.create);
router.get("/:id/edit", scheme.edit);
router.put("/:id", scheme.update);
router.delete("/:id", scheme.delete);
router.get("/:id", scheme.show);

module.exports = router;
