const express = require("express");

const ReplayController =
require("../controllers/ReplayController");

const router = express.Router();

router.get("/status", ReplayController.status);

router.post("/stop", ReplayController.stop);

router.post("/speed", ReplayController.speed);

module.exports = router;