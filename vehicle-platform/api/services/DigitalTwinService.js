const RuntimeManager = require("../../core/RuntimeManager");

class DigitalTwinService {

    getRuntime() {

        const runtime = RuntimeManager.getRuntime();

        if (!runtime) {
            throw new Error("FleetTwin Runtime is not running.");
        }

        return runtime;
    }

    getDigitalTwin() {
        return this.getRuntime().getDigitalTwin();
    }

    getState() {
        return this.getDigitalTwin().getState();
    }

}

module.exports = new DigitalTwinService();