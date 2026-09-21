require("dotenv").config();
const path = require("path");

const app = require("./api/server");

const CSVSource = require("./replay/CSVSource");
const ReplayEngine = require("./replay/ReplayEngine");
const FleetTwinRuntime = require("./core/FleetTwinRuntime");
const RuntimeManager = require("./core/RuntimeManager");

(async () => {

    try {

        const source = new CSVSource(
            path.join(
                __dirname,
                "../datasets/raw/csv/sample1.csv"
            )
        );

        await source.open();

        const replay = new ReplayEngine(source, {
            loop: true
        });

        const runtime = new FleetTwinRuntime(replay);

        RuntimeManager.setRuntime(runtime);

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`FleetTwin API running on port ${PORT}`);
        });

        //await runtime.start();

    } catch (err) {

        console.error("Application startup failed:");
        console.error(err);

    }

})();