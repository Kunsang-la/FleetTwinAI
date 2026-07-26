const Signal = require("../signals/Signal");

/**
 * PGN 61444 - EEC1
 *
 * SPN 190 - Engine Speed
 * Resolution: 0.125 rpm/bit
 */
class EEC1Decoder {

    static decode(frame) {

        const data = frame.data;

        if (data.length < 5) {
            return [];
        }

        const lowByte = data[3];
        const highByte = data[4];

        // J1939: 0xFF 0xFF = Not Available
        if (lowByte === 0xFF && highByte === 0xFF) {
            return [];
        }

        const rawEngineSpeed = (highByte << 8) | lowByte;
        const engineSpeed = rawEngineSpeed * 0.125;

        return [
            new Signal({
                category: "engine",
                key: "rpm",
                name: "Engine Speed",
                value: Number(engineSpeed.toFixed(2)),
                unit: "rpm",
                timestamp: frame.timestamp
            })
        ];

    }

}

module.exports = EEC1Decoder;
