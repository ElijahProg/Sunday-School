const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.get("/login", loginController.loginView);
router.post("/login", loginController.authenticator);

module.exports = router;
