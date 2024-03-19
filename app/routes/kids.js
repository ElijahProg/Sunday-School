var express = require("express");
var router = express.Router();
var kidsController = require("../controllers/kidsController");
const { protectRoute } = require("../auth/protect");

router.get("/kids",protectRoute, kidsController.kidsList);
router.get("/kids/add",protectRoute, kidsController.addKidWizard);
router.post("/kids/add",protectRoute, kidsController.addKid);
router.get("/kids/detail",protectRoute, kidsController.detail);
router.post("/kids/add-school",protectRoute,kidsController.addSchool);

module.exports = router;
