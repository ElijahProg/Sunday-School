const express = require("express");
const userController = require("../controllers/userController");
const dashboardController = require("../controllers/dashboardController");
const router = express.Router();
const { protectRoute } = require("../auth/protect");

router.get("/users",protectRoute, userController.users);
router.get("/register",protectRoute, userController.registerUserView);
router.post("/register",protectRoute, userController.registerUser);
router.get("/",protectRoute, dashboardController.dashboard);
router.get("/dashboard",protectRoute, dashboardController.dashboard);

module.exports = router;
