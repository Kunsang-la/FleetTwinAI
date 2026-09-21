const VehicleService = require("../services/VehicleService");

class VehicleController {

    static health(req, res) {

        res.json({
            status: "OK",
            service: "FleetTwin AI",
            version: "1.0.0"
        });

    }

    static vehicle(req, res) {

        try {

            res.json(
                VehicleService.getVehicleJSON()
            );

        }

        catch (err) {

            res.status(503).json({
                error: err.message
            });

        }

    }

    static engine(req, res) {

        try {

            res.json(
                VehicleService.getEngine()
            );

        }

        catch (err) {

            res.status(503).json({
                error: err.message
            });

        }

    }

    static motion(req, res) {

        try {

            res.json(
                VehicleService.getMotion()
            );

        }

        catch (err) {

            res.status(503).json({
                error: err.message
            });

        }

    }

    static cooling(req, res) {

        try {

            res.json(
                VehicleService.getCooling()
            );

        }

        catch (err) {

            res.status(503).json({
                error: err.message
            });

        }

    }

    static fuel(req, res) {

        try {

            res.json(
                VehicleService.getFuel()
            );

        }

        catch (err) {

            res.status(503).json({
                error: err.message
            });

        }

    }

    static diagnostics(req, res) {

        try {

            res.json(
                VehicleService.getDiagnostics()
            );

        }

        catch (err) {

            res.status(503).json({
                error: err.message
            });

        }

    }

}

module.exports = VehicleController;