const RuntimeManager = require("../core/RuntimeManager");

class VehicleService {

    getVehicle() {

        const runtime = RuntimeManager.getRuntime();

        if (!runtime) {
            return null;
        }

        return runtime.getDigitalTwin().vehicle;

    }

    getVehicleJSON() {

        const vehicle = this.getVehicle();

        if (!vehicle) {
            return null;
        }

        return vehicle.toJSON();

    }

}

module.exports = new VehicleService();