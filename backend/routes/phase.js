const phase = require("../controllers/phase");

const router = require("express").Router();

// const { validateHei, heiValidateRules } = require("../validations/base-tables");

router.get("/", phase.index);
router.post("/", phase.create);
router.get("/:id/edit", phase.edit);
router.put("/:id", phase.update);
router.delete("/:id", phase.delete);
router.get("/:id", phase.show);

module.exports = router;
