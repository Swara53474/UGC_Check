const hei = require("../controllers/hei");

const router = require("express").Router();

const { validateHei, heiValidateRules } = require("../validations/base-tables");

router.get("/", hei.index);
router.post("/", heiValidateRules(), validateHei, hei.create);
router.get("/:id/edit", hei.edit);
router.put("/:id", heiValidateRules(), validateHei, hei.update);
router.delete("/:id", hei.delete);
router.get("/:id", hei.show);

module.exports = router;
