const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const checkIsAdmin = require("../middlewares/checkIsAdmin");


const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkIsAdmin = require("../middlewares/checkIsAdmin");



router.get("/users/:userId", authController.getUserInfo);
router.put("/users/:userId", authController.updateUserInfo);

module.exports = router;