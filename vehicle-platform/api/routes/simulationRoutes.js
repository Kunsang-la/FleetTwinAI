const express = require("express");
const RuntimeManager = require("../../core/RuntimeManager");

const router = express.Router();

router.get("/status", (req, res) => {

    const runtime = RuntimeManager.getRuntime();

    if (!runtime) {
        return res.status(503).json({
            error: "FleetTwin runtime is not initialized"
        });
    }

    res.json(
        runtime.getSimulationStatus()
    );

});

router.post("/start", async (req, res) => {

    const runtime = RuntimeManager.getRuntime();

    if (!runtime) {
        return res.status(503).json({
            error: "FleetTwin runtime is not initialized"
        });
    }

    try {

        await runtime.startSimulation();

        res.json({
            message: "Simulation started",
            status: runtime.getSimulationStatus()
        });

    } catch (error) {

        console.error(
            "[API] Simulation start failed:",
            error
        );

        res.status(500).json({
            error: "Failed to start simulation"
        });

    }

});

router.post("/pause", (req, res) => {

    const runtime = RuntimeManager.getRuntime();

    if (!runtime) {
        return res.status(503).json({
            error: "FleetTwin runtime is not initialized"
        });
    }

    runtime.pauseSimulation();

    res.json({
        message: "Simulation paused",
        status: runtime.getSimulationStatus()
    });

});

router.post("/resume", (req, res) => {

    const runtime = RuntimeManager.getRuntime();

    if (!runtime) {
        return res.status(503).json({
            error: "FleetTwin runtime is not initialized"
        });
    }

    runtime.resumeSimulation();

    res.json({
        message: "Simulation resumed",
        status: runtime.getSimulationStatus()
    });

});

router.post("/stop", (req, res) => {

    const runtime = RuntimeManager.getRuntime();

    if (!runtime) {
        return res.status(503).json({
            error: "FleetTwin runtime is not initialized"
        });
    }

    runtime.stopSimulation();

    res.json({
        message: "Simulation stopped",
        status: runtime.getSimulationStatus()
    });

});
router.post("/events/refrigeration-failure", (req, res) => {

    const runtime = RuntimeManager.getRuntime();

    if (!runtime) {
        return res.status(503).json({
            error: "FleetTwin runtime is not initialized"
        });
    }

    runtime.simulationEngine.triggerRefrigerationFailure();

    res.json({
        message: "Refrigeration failure triggered",
        status: runtime.getSimulationStatus()
    });

});


router.post("/events/refrigeration-recover", (req, res) => {

    const runtime = RuntimeManager.getRuntime();

    if (!runtime) {
        return res.status(503).json({
            error: "FleetTwin runtime is not initialized"
        });
    }

    runtime.simulationEngine.clearRefrigerationFailure();

    res.json({
        message: "Refrigeration failure cleared",
        status: runtime.getSimulationStatus()
    });

});

router.post("/events/cargo-door-open", (req, res) => {

    const runtime = RuntimeManager.getRuntime();

    if (!runtime) {
        return res.status(503).json({
            error: "FleetTwin runtime is not initialized"
        });
    }

    runtime.simulationEngine.triggerCargoDoorOpen();

    res.json({
        message: "Cargo door opened",
        status: runtime.getSimulationStatus()
    });

});


router.post("/events/cargo-door-close", (req, res) => {

    const runtime = RuntimeManager.getRuntime();

    if (!runtime) {
        return res.status(503).json({
            error: "FleetTwin runtime is not initialized"
        });
    }

    runtime.simulationEngine.clearCargoDoorOpen();

    res.json({
        message: "Cargo door closed",
        status: runtime.getSimulationStatus()
    });

});
router.post("/events/overspeed", (req, res) => {

    const runtime = RuntimeManager.getRuntime();

    if (!runtime) {
        return res.status(503).json({
            error: "FleetTwin runtime is not initialized"
        });
    }

    runtime.simulationEngine.triggerOverspeed();

    res.json({
        message: "Overspeed anomaly triggered",
        status: runtime.getSimulationStatus()
    });

});


router.post("/events/overspeed-recover", (req, res) => {

    const runtime = RuntimeManager.getRuntime();

    if (!runtime) {
        return res.status(503).json({
            error: "FleetTwin runtime is not initialized"
        });
    }

    runtime.simulationEngine.clearOverspeed();

    res.json({
        message: "Overspeed anomaly cleared",
        status: runtime.getSimulationStatus()
    });

});

module.exports = router;