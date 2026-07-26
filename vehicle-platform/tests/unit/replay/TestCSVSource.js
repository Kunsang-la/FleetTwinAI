const path = require("path");

const CSVSource =
    require("../../../replay/CSVSource");

(async () => {

    const source = new CSVSource(

        path.join(
            __dirname,
            "../../../../datasets/raw/csv/sample1.csv"
        )

    );

    await source.open();

    for (let i = 0; i < 5; i++) {

        const frame =
            await source.nextFrame();

        console.log("\nFrame", i + 1);

        console.log(frame);

    }

    await source.close();

})();

