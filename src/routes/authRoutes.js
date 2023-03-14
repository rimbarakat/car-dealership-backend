const express = require("express");

const controller = require("../controllers/authController");
const router = express.Router();

router.post("/login", controller.loginUser);
router.post("/register", controller.registerUser);

module.exports = router;
