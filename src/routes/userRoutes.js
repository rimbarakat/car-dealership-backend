const express = require("express");

const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkIsAdmin = require("../middlewares/checkIsAdmin");
const router = express.Router();

router.get("/:userId", userController.getUserInfo);
router.put("/:userId", userController.updateUserInfo);

module.exports = router;
