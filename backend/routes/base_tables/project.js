const project = require("../../controllers/base_tables/project");
const router = require("express").Router();

router.get("/", project.index);
router.post("/", project.create);
router.get("/:id/edit", project.edit);
router.put("/:id", project.update);
router.delete("/:id", project.delete);
router.get("/:id", project.show);

module.exports = router;
