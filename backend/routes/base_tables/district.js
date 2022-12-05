const district = require("../../controllers/base_tables/district");

const router = require("express").Router();

const {
  validateBaseTables,
  baseTableValidateRules,
} = require("../../validations/base-tables");

router.get("/", district.index);
router.post("/", baseTableValidateRules(), validateBaseTables, district.create);
router.get("/:id/edit", district.edit);
router.put(
  "/:id",
  baseTableValidateRules(),
  validateBaseTables,
  district.update
);
router.delete("/:id", district.delete);
router.get("/:id", district.show);

module.exports = router;
