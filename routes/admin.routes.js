const router = require("express").Router();
const upload = require("../config/multer");

const {
	Dashboard,
	messageGet,
	messagePost,
	staffRecordGet,
	staffRecordPost,
	studentRecordGet,
	studentRecordPost,
} = require("../controllers/admin_controller");
const { verifyPermission } = require("../middlewares/auth");

router.get("/", verifyPermission, Dashboard);
router.route("/message").get(verifyPermission, messageGet).post(messagePost);
router
	.route("/student-record")
	.get(verifyPermission, studentRecordGet)
	.post(upload.single("excelSheet"), studentRecordPost);
router
	.route("/staff-record")
	.get(verifyPermission, staffRecordGet)
	.post(upload.single("excelSheet"), staffRecordPost);

module.exports = router;
