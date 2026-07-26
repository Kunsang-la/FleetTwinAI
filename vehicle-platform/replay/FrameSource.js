/**
 * FleetTwin AI
 * Abstract base class for all CAN frame sources.
 */

class FrameSource {
    async open() {
        throw new Error("open() not implemented");
    }

    async nextFrame() {
        throw new Error("nextFrame() not implemented");
    }

    async close() {
        // Optional override
    }
}

module.exports = FrameSource;
