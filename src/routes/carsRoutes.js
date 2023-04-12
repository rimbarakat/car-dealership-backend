const express = require("express");

const controller = require("../controllers/carsController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkIsAdmin = require("../middlewares/checkIsAdmin");
const router = express.Router();

router.get("/", authMiddleware, controller.getCars);
router.post("/", authMiddleware, checkIsAdmin, controller.addCar);
router.get("/:id", authMiddleware, controller.getCar);
router.delete("/:id", authMiddleware, checkIsAdmin, controller.deleteCar);
router.put("/:id", authMiddleware, checkIsAdmin, controller.updateCar);
router.get("/:id/bookings", controller.getCarBookings);

module.exports = router;
