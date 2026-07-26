const Signal = require("../signals/Signal");

/**
 * PGN 61443 - EEC2
 *
 * SPN 91 - Accelerator Pedal Position
 * Resolution: 0.4 %/bit
 */
class EEC2Decoder {

    static decode(frame) {

        const data = frame.data;

        if (data.length < 2) {
            return [];
        }

        const pedalByte = data[1];

        // J1939: 0xFE and 0xFF = Invalid/Not Available
        if (pedalByte >= 0xFE) {
            return [];
        }

        const pedalPosition = pedalByte * 0.4;

        return [
            new Signal({
                category: "engine",
                key: "acceleratorPosition",
                name: "Accelerator Pedal Position",
                value: Number(pedalPosition.toFixed(1)),
                unit: "%",
                timestamp: frame.timestamp
            })
        ];

    }

}

module.exports = EEC2Decoder;
