const path = require("path");

const CSVSource = require("../../../replay/CSVSource");
const J1939Decoder = require("../../../j1939/J1939Decoder");

(async () => {

    const source = new CSVSource(
        path.join(
            __dirname,
            "../../../../datasets/raw/csv/sample1.csv"
        )
    );

    await source.open();

    let frame;

    while ((frame = await source.nextFrame())) {

        const signals = J1939Decoder.decode(frame);

        if (signals.length > 0) {

            console.log(`PGN ${frame.pgn}`);

            console.table(
                signals.map(signal => ({
                    Name: signal.name,
                    Value: signal.value,
                    Unit: signal.unit
                }))
            );

            break;
        }
    }

    await source.close();

})();
