const Signal = require("../signals/Signal");

/**
 * PGN 65262 - ET1 (Engine Temperature 1)
 *
 * SPN 110 - Engine Coolant Temperature
 * Resolution: 1 °C/bit
 * Offset: -40 °C
 */
class ET1Decoder {

    static decode(frame) {

        const data = frame.data;

        if (data.length < 1) {
            return [];
        }

        const coolantByte = data[0];

        // J1939: 0xFE and 0xFF indicate invalid/not available
        if (coolantByte >= 0xFE) {
            return [];
        }

        const coolantTemperature = coolantByte - 40;

        return [
            new Signal({
                category: "cooling",
                key: "coolantTemperature",
                name: "Engine Coolant Temperature",
                value: coolantTemperature,
                unit: "°C",
                timestamp: frame.timestamp
            })
        ];

    }

}

module.exports = ET1Decoder;
