const path = require("path");

const CSVSource = require("../../replay/CSVSource");
const ReplayEngine = require("../../replay/ReplayEngine");
const FleetTwinRuntime = require("../../core/FleetTwinRuntime");

(async () => {

    const source = new CSVSource(
        path.join(
            __dirname,
            "../../../datasets/raw/csv/sample1.csv"
        )
    );

    await source.open();

    const replay = new ReplayEngine(source);

    const runtime = new FleetTwinRuntime(replay);

    await runtime.start();

    console.log("\n========== REPLAY COMPLETE ==========\n");

    runtime.getVehicleState().printSummary();

    runtime.getVehicleState().printDiagnostics();

})();
