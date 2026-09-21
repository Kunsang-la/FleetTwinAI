require("dotenv").config();
const FleetTwinRuntime = require("../core/FleetTwinRuntime");

async function test() {

    const runtime = new FleetTwinRuntime(null);

    await runtime.startSimulation();

    setTimeout(() => {

        console.log("\n===== RUNTIME TEST =====");

        console.log(
            JSON.stringify(
                runtime.getDigitalTwin().getState(),
                null,
                2
            )
        );

        console.log(
            "\nSIMULATION STATUS:"
        );

        console.log(
            runtime.getSimulationStatus()
        );

        runtime.stopSimulation();

    }, 5000);
}

test();