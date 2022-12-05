const state = require("../../controllers/base_tables/state");

const router = require("express").Router();

const {
  validateBaseTables,
  baseTableValidateRules,
} = require("../../validations/base-tables");

router.get("/", state.index);
router.post("/", baseTableValidateRules(), validateBaseTables, state.create);
router.get("/:id/edit", state.edit);
router.put("/:id", baseTableValidateRules(), validateBaseTables, state.update);
router.delete("/:id", state.delete);
router.get("/:id", state.show);

module.exports = router;
