const path = require("path");

const CSVSource = require("../../../replay/CSVSource");
const ReplayEngine = require("../../../replay/ReplayEngine");

(async () => {

    const source = new CSVSource(

        path.join(
            __dirname,
            "../../../../datasets/raw/csv/sample1.csv"
        )

    );

    await source.open();

    const replay = new ReplayEngine(source);

    await replay.start(async (frame) => {

        console.log(
            `[${frame.timestamp.toFixed(5)}] PGN=${frame.pgn} SA=${frame.sa}`
        );

    });

})();
