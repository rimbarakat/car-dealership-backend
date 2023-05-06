const express = require("express");

const controller = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
//const login_limiter = require("../middlewares/login_limiter");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const login_limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // Limit each IP to 100 requests per windowMs
    message: "Too many login tries, please try again later.",
});

router.get("/", authMiddleware, controller.authenticate);
router.post("/login", login_limiter, controller.loginUser); // Apply the login_limiter middleware to the /login route
router.post("/register", controller.registerUser);

module.exports = router;
