const PGNRegistry = require("./PGNRegistry.js");
class J1939Decoder {
      static decode(frame){
         const Decoder =PGNRegistry.getDecoder(frame.pgn);
         if(!Decoder){
           return [];
         } 
         return Decoder.decode(frame);
      }
}
module.exports = J1939Decoder;
