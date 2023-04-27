const express = require("express");

const bookingsController = require("../controllers/bookingsController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

/* booking routes */

router.get("/:id", bookingsController.getCarBookings);
router.post("/:id", bookingsController.addBooking);
router.delete("/:id/:bid", bookingsController.deleteBooking);
router.get("/", bookingsController.getAllBookings);

module.exports = router;
