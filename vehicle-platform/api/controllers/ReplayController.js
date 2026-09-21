const ReplayService = require("../services/ReplayService");

class ReplayController {

    static status(req, res) {

        try {

            res.json(
                ReplayService.status()
            );

        } catch (err) {

            res.status(503).json({
                error: err.message
            });

        }

    }
    static stop(req, res) {

        res.json({
            message: "stop endpoint works"
        });

    }

    static speed(req, res) {

        try {

            const speed = Number(req.body.speed);

            ReplayService.setSpeed(speed);

            res.json({
                message: "Replay speed updated.",
                speed
            });

        } catch (err) {

            res.status(400).json({
                error: err.message
            });

        }

    }

}

module.exports = ReplayController;