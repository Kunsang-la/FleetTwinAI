const RuntimeManager = require("../../core/RuntimeManager");

class VehicleService {

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

    getVehicle() {
        return this.getDigitalTwin().vehicle;
    }

    getVehicleJSON() {
        return this.getVehicle().toJSON();
    }

    getEngine() {
        return this.getVehicleJSON().engine;
    }

    getMotion() {
        return this.getVehicleJSON().motion;
    }

    getCooling() {
        return this.getVehicleJSON().cooling;
    }

    getFuel() {
        return this.getVehicleJSON().fuel;
    }

    getDiagnostics() {
        return this.getVehicleJSON().diagnostics;
    }

}

module.exports = new VehicleService();