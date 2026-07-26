/**
 * -------------------------------------------------------
 * FleetTwin AI
 * CAN Frame Model
 * -------------------------------------------------------
 * Represents one CAN/J1939 frame regardless of source.
 * Sources may include:
 *   - CSV Replay
 *   - candump
 *   - ASC
 *   - BLF
 *   - SocketCAN
 * -------------------------------------------------------
 */

class CANFrame {

    constructor({

        timestamp = 0,

        arbitrationId = "",

        arbitrationIdInt = 0,

        pgn = 0,

        pf = 0,

        ps = 0,

        sa = 0,

        dlc = 8,

        data = []

    }) {

        this.timestamp = timestamp;

        this.arbitrationId = arbitrationId;

        this.arbitrationIdInt = arbitrationIdInt;

        this.pgn = pgn;

        this.pf = pf;

        this.ps = ps;

        this.sa = sa;

        this.dlc = dlc;

        this.data = data;

    }

}

module.exports = CANFrame;
