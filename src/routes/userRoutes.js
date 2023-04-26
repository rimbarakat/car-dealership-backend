const express = require("express");

const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkIsAdmin = require("../middlewares/checkIsAdmin");
const router = express.Router();


router.get("/users/:userId", userController.getUserInfo);
router.put("/users/:userId", userController.updateUserInfo);
// router.get("/users/bookings", authController.getUserBookings);

module.exports = router;