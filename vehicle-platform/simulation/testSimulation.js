require("dotenv").config();
const DigitalTwin = require("../src/digitalTwin/DigitalTwin");
const SimulationEngine = require("./SimulationEngine");

async function test() {

    const twin = new DigitalTwin();

    const simulation = new SimulationEngine(twin);

    await simulation.start();

    setTimeout(() => {

        console.log(
            JSON.stringify(
                twin.getState(),
                null,
                2
            )
        );

        console.log(
            "SIMULATION STATUS:",
            simulation.getStatus()
        );

        simulation.stop();

    }, 35000);
}

test();