let runtime = null;

module.exports = {

    setRuntime(instance) {
        runtime = instance;
    },

    getRuntime() {
        return runtime;
    },

    getReplayEngine() {

        if (!runtime) {
            return null;
        }

        return runtime.replayEngine;

    }

};