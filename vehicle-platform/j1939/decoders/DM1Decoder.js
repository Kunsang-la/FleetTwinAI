const Signal = require("../signals/Signal");
const DTC = require("../models/DTC");

class DM1Decoder {

    static decode(frame) {

        const data = frame.data;

        if (data.length < 2) {
            return [];
        }

        const lampByte = data[0];

        const signals = [

            new Signal({
                category: "diagnostics",
                key: "mil",
                name: "MIL Lamp",
                value: (lampByte & 0b11) !== 0,
                unit: "",
                timestamp: frame.timestamp
            }),

            new Signal({
                category: "diagnostics",
                key: "redStop",
                name: "Red Stop Lamp",
                value: ((lampByte >> 2) & 0b11) !== 0,
                unit: "",
                timestamp: frame.timestamp
            }),

            new Signal({
                category: "diagnostics",
                key: "amberWarning",
                name: "Amber Warning Lamp",
                value: ((lampByte >> 4) & 0b11) !== 0,
                unit: "",
                timestamp: frame.timestamp
            }),

            new Signal({
                category: "diagnostics",
                key: "protectLamp",
                name: "Protect Lamp",
                value: ((lampByte >> 6) & 0b11) !== 0,
                unit: "",
                timestamp: frame.timestamp
            })

        ];

        // Decode DTCs
        for (let i = 2; i + 3 < data.length; i += 4) {

            const b1 = data[i];
            const b2 = data[i + 1];
            const b3 = data[i + 2];
            const b4 = data[i + 3];

            // Skip empty DTC entries
            if (b1 === 0xFF && b2 === 0xFF && b3 === 0xFF && b4 === 0xFF) {
                continue;
            }

            const spn =
                b1 |
                (b2 << 8) |
                ((b3 & 0xE0) << 11);

            const fmi = b3 & 0x1F;

            const occurrenceCount = b4 & 0x7F;

            if (spn === 0 && fmi === 0 && occurrenceCount === 0) {
               continue;
            }
            signals.push(
                new Signal({
                    category: "diagnostics",
                    key: "activeDTCs",
                    name: "Active DTC",
                    value: new DTC({
                        spn,
                        fmi,
                        occurrenceCount
                    }),
                    unit: "",
                    timestamp: frame.timestamp
                })
            );

        }

        return signals;

    }

}

module.exports = DM1Decoder;
