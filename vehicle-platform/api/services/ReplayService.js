const RuntimeManager = require("../../core/RuntimeManager");

class ReplayService {

    getReplayEngine() {

        const replay = RuntimeManager.getReplayEngine();

        if (!replay) {
            throw new Error("Replay engine unavailable.");
        }

        return replay;

    }

    status() {

        const replay = this.getReplayEngine();

        return {

            running: replay.isRunning(),

            speed: replay.getSpeed(),

            loop: replay.loop

        };

    }

    stop() {

        this.getReplayEngine().stop();

    }

    setSpeed(speed) {

        this.getReplayEngine().setSpeed(speed);

    }

}

module.exports = new ReplayService();