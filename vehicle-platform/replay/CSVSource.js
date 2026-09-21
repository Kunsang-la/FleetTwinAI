const fs = require("fs");
const csv = require("csv-parser");

const FrameSource = require("./FrameSource");
const CANFrame = require("../models/CANFrame");

class CSVSource extends FrameSource {

    constructor(filePath) {
        super();

        this.filePath = filePath;
        this.stream = null;
        this.iterator = null;
    }

    async open() {

        const stream =
            fs.createReadStream(this.filePath)
                .pipe(csv());

        this.stream = stream;

        this.iterator = stream[Symbol.asyncIterator]();
    }

    async nextFrame() {

        const result = await this.iterator.next();

        if (result.done)
            return null;

        const row = result.value;

        return new CANFrame({

            timestamp:
                Number(row.Timestamp),

            arbitrationId:
                row.Arbitration_ID,

            arbitrationIdInt:
                Number(row["Arbitration_ID(int)"]),

            pgn:
                Number(row.PGN),

            pf:
                Number(row.PF),

            ps:
                Number(row.PS),

            sa:
                Number(row.SA),

            dlc:
                Number(row.DLC),

            data:
                JSON.parse(row["Data(int)"])

        });

    }
    async reset() {

    await this.open();

}

    async close() {

        if (this.stream)
            this.stream.destroy();

    }

}

module.exports = CSVSource;
