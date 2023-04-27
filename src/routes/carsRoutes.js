const express = require("express");

const carsController = require("../controllers/carsController");
const bookingsController = require("../controllers/bookingsController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkIsAdmin = require("../middlewares/checkIsAdmin");
const router = express.Router();

router.get("/", authMiddleware, carsController.getCars);
router.post("/", authMiddleware, checkIsAdmin, carsController.addCar);
router.get("/:id", authMiddleware, carsController.getCar);
router.delete("/:id", authMiddleware, checkIsAdmin, carsController.deleteCar);
router.put("/:id", authMiddleware, checkIsAdmin, carsController.updateCar);
router.get("/:id/slots", carsController.getCarBookingSlots); //for frontend calendar query


module.exports = router;
