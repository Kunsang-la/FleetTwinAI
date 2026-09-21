const DigitalTwinService = require("../services/DigitalTwinService");

class DigitalTwinController {

    static state(req, res) {

        try {

            res.json(
                DigitalTwinService.getState()
            );

        }

        catch (err) {

            res.status(503).json({
                error: err.message
            });

        }

    }

}

module.exports = DigitalTwinController;