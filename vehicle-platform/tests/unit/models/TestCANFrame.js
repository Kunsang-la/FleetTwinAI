const CANFrame =
require("../../../models/CANFrame");

const frame =
new CANFrame({

    timestamp: 2.123,

    arbitrationId: "18F00400",

    arbitrationIdInt: 418382080,

    pgn: 61444,

    pf: 240,

    ps: 4,

    sa: 0,

    dlc: 8,

    data: [
        0x20,
        0x03,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF,
        0xFF
    ]

});

console.log(frame);
