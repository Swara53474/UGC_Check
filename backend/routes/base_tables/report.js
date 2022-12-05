const report = require("../../controllers/base_tables/report");
const router = require("express").Router();

router.get("/", report.index);
router.post("/", report.create);
router.get("/:id/edit", report.edit);
router.put("/:id", report.update);
router.delete("/:id", report.delete);
router.get("/:id", report.show);
module.exports = router;
