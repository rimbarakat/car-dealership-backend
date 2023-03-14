const express = require("express");

const controller = require("../controllers/bookingsController");
const router = express.Router();

router.get("/", controller.getBookings);

module.exports = router;
