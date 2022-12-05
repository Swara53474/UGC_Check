const country = require("../../controllers/base_tables/country");

const router = require("express").Router();
const {
  validateBaseTables,
  baseTableValidateRules,
} = require("../../validations/base-tables");

router.get("/", country.index);
router.post("/", baseTableValidateRules(), validateBaseTables, country.create);
router.get("/:id/edit", country.edit);
router.put(
  "/:id",
  baseTableValidateRules(),
  validateBaseTables,
  country.update
);
router.delete("/:id", country.delete);
router.get("/:id", country.show);

module.exports = router;
