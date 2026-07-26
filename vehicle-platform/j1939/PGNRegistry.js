const EEC1Decoder = require("./decoders/EEC1Decoder");
const EEC2Decoder = require("./decoders/EEC2Decoder");
const ET1Decoder  = require("./decoders/ET1Decoder");
const CCVSDecoder  = require("./decoders/CCVSDecoder");
const DM1Decoder = require("./decoders/DM1Decoder");

class PGNRegistry {

    static registry = new Map([

        [61444, EEC1Decoder],
        [61443, EEC2Decoder],
        [65262, ET1Decoder],
        [65226, DM1Decoder],
        [65265, CCVSDecoder]
        

    ]);

    static getDecoder(pgn) {

        return this.registry.get(pgn) || null;

    }

}

module.exports = PGNRegistry;
