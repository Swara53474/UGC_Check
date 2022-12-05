const university = require("../../controllers/base_tables/university");

const router = require("express").Router();

const {
  validateUniversities,
  universityValidateRules,
} = require("../../validations/base-tables");

router.get("/", university.index);
router.post(
  "/",
  universityValidateRules(),
  validateUniversities,
  university.create
);
router.get("/:id/edit", university.edit);
router.put(
  "/:id",
  universityValidateRules(),
  validateUniversities,
  university.update
);
router.delete("/:id", university.delete);
router.get("/:id", university.show);

module.exports = router;
