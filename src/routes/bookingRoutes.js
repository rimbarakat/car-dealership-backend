const express = require("express");

const controller = require("../src/controllers/bookingController");
const router = express.Router();

router.get("/", controller.getBookings);

module.exports = router;
