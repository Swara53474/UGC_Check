const teamMember = require("../controllers/teamMember");

const router = require("express").Router();

const { validateHei, heiValidateRules } = require("../validations/base-tables");

router.get("/", teamMember.index);
router.post("/", teamMember.create);
router.get("/:id/edit", teamMember.edit);
router.put("/:id", teamMember.update);
router.delete("/:id", teamMember.delete);
router.get("/:id", teamMember.show);

module.exports = router;
