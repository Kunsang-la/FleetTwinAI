const DigitalTwin = require("../src/digitalTwin/DigitalTwin");
const J1939Decoder = require("../j1939/J1939Decoder");
const SimulationEngine = require("../simulation/SimulationEngine");

class FleetTwinRuntime {

    constructor(replayEngine) {

        this.replayEngine = replayEngine;

        // Single source of truth
        this.digitalTwin = new DigitalTwin();

        // Simulation uses the same Digital Twin
        this.simulationEngine =
            new SimulationEngine(this.digitalTwin);
    }

    async start() {

        await this.replayEngine.start(async (frame) => {

            const signals = J1939Decoder.decode(frame);

            if (signals.length > 0) {
                this.digitalTwin.vehicle.update(signals);
                this.digitalTwin.updateTimestamp();

                // Display the current vehicle state (optional)
                // this.vehicleState.printSummary();
            }

        });

    }
    async startSimulation() {

        await this.simulationEngine.start();

    }
    pauseSimulation() {

        this.simulationEngine.pause();

    }

    resumeSimulation() {

        this.simulationEngine.resume();

    }

    stopSimulation() {

        this.simulationEngine.stop();

    }

    getSimulationStatus() {

        return this.simulationEngine.getStatus();

    }

    getDigitalTwin() {
        return this.digitalTwin;
    }

}

module.exports = FleetTwinRuntime;
