const Signal = require("../signals/Signal");

/**
 * PGN 65265 - CCVS
 *
 * SPN 84 - Wheel-Based Vehicle Speed
 * Resolution: 1/256 km/h
 * Offset: 0
 */
class CCVSDecoder {

    static decode(frame) {

        const data = frame.data;

        if (data.length < 2) {
            return [];
        }

        const lowByte = data[0];
        const highByte = data[1];

        // J1939: 0xFF 0xFF = Not Available
        if (lowByte === 0xFF && highByte === 0xFF) {
            return [];
        }

        const rawSpeed = (highByte << 8) | lowByte;
        const speed = rawSpeed / 256;

        return [
            new Signal({
                category: "motion",
                key: "speed",
                name: "Vehicle Speed",
                value: Number(speed.toFixed(2)),
                unit: "km/h",
                timestamp: frame.timestamp
            })
        ];

    }

}

module.exports = CCVSDecoder;
