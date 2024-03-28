const express = require("express");
const setting = require("../controllers/settingsController");
const router = express.Router();
const { protectRoute } = require("../auth/protect");

router.get("/setting/grade-list",protectRoute, setting.gradesList);
router.post("/setting/grade-add",protectRoute, setting.addGrade);
router.post("/setting/grade-remove",protectRoute, setting.removeGrade);
router.get("/setting/subject-list",protectRoute, setting.subjectsList);
router.post("/setting/subject-add",protectRoute, setting.addSubject);
module.exports = router;
