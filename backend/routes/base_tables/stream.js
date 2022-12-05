const stream = require("../../controllers/base_tables/stream");

const router = require("express").Router();

const {
  validateStreams,
  streamValidateRules,
} = require("../../validations/base-tables");

router.get("/", stream.index);
router.post("/", streamValidateRules(), validateStreams, stream.create);
router.get("/:id/edit", stream.edit);
router.put("/:id", stream.update);
router.delete("/:id", stream.delete);
router.get("/:id", stream.show);

module.exports = router;
