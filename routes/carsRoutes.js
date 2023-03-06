const express = require("express");

const controller = require("../src/controllers/carsController");
const authMiddleware = require("../src/middlewares/authMiddleware");
const router = express.Router();

router.get("/", controller.getCars);
router.post("/", controller.addCar);
router.get("/:id", controller.getCar);
router.delete("/:id", authMiddleware, controller.deleteCar);
router.put("/:id", controller.updateCar);
router.get("/:id/bookings", controller.getCarBookings);

module.exports = router;
