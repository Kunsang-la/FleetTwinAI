const express = require("express");

const VehicleController = require("../controllers/VehicleController");

const router = express.Router();

router.get("/health", VehicleController.health);

router.get("/vehicle", VehicleController.vehicle);

router.get("/engine", VehicleController.engine);

router.get("/motion", VehicleController.motion);

router.get("/cooling", VehicleController.cooling);

router.get("/fuel", VehicleController.fuel);

router.get("/diagnostics", VehicleController.diagnostics);

module.exports = router;