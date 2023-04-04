const express = require("express");

const controller = require("../controllers/bookingsController");
const router = express.Router();

router.get("/", controller.getBookings);
router.get("/:id", controller.getBooking);
router.post("/",controller.addBooking);
router.delete("/:id",controller.deleteBooking);

module.exports = router;