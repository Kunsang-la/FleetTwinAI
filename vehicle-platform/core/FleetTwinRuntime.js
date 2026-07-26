const VehicleState = require("../vehicle/VehicleState");
const J1939Decoder = require("../j1939/J1939Decoder");

class FleetTwinRuntime {

    constructor(replayEngine) {
        this.replayEngine = replayEngine;
        this.vehicleState = new VehicleState();
    }

    async start() {

        await this.replayEngine.start(async (frame) => {

            const signals = J1939Decoder.decode(frame);

            if (signals.length > 0) {
                this.vehicleState.update(signals);

                // Display the current vehicle state
                this.vehicleState.printSummary();
            }

        });

    }

    getVehicleState() {
        return this.vehicleState;
    }

}

module.exports = FleetTwinRuntime;
