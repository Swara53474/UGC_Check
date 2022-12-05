const role = require("../controllers/role");
const router = require("express").Router();
const { checkPermission } = require("../middleware/permissionMiddleware");

router.post("/", checkPermission("Sample permissions"), role.create);

module.exports = router;
