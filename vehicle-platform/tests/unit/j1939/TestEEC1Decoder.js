const path = require("path");

const CSVSource =
    require("../../../replay/CSVSource");

const EEC1Decoder =
    require("../../../j1939/decoders/EEC1Decoder");

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

        if (frame.pgn === 61444) {

            console.log(frame);

            const signals =
                EEC1Decoder.decode(frame);

            console.log(signals);

            break;

        }

    }

})();
