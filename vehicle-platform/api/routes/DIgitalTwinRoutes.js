const express = require("express");

const DigitalTwinController = require("../controllers/DigitalTwinController");

const router = express.Router();

router.get("/", DigitalTwinController.state);

module.exports = router;