const router = require("express").Router();
const { loginAdmin, logoutHandler } = require("../controllers/auth_controller");

router.post("/login", loginAdmin);
router.get("/logout", logoutHandler);

module.exports = router;
