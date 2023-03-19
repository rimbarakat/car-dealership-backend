const express = require("express");

const controller = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, controller.authenticate);
router.post("/login", controller.loginUser);
router.post("/register", controller.registerUser);

module.exports = router;
