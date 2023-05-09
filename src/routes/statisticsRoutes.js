const express = require("express");

const statisticsController = require("../controllers/statisticsController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkIsAdmin = require("../middlewares/checkIsAdmin");
const router = express.Router();

/* statistics routes */

router.get("/", authMiddleware, statisticsController.getStatistics);

module.exports = router;
