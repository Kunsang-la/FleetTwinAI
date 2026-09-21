/**
 * ==========================================================
 * FleetTwin AI
 * Replay Engine
 * ==========================================================
 *
 * Replays CAN frames according to recorded timestamps.
 *
 * Features:
 *  - Original timing replay
 *  - Configurable replay speed
 *  - Optional looping
 *  - Start / Stop support
 */

class ReplayEngine {

    constructor(frameSource, options = {}) {

        this.frameSource = frameSource;

        this.running = false;

        // Replay speed
        // 1 = real-time
        // 2 = 2x faster
        // 0.5 = half speed
        this.speed = options.speed || 1;

        // Restart replay automatically
        this.loop = options.loop || false;

    }

    async start(onFrame) {

        if (this.running) {
            return;
        }

        this.running = true;

        do {

            let previousFrame = null;

            while (this.running) {

                const frame = await this.frameSource.nextFrame();

                if (!frame) {

                    console.log("\nReplay finished.");

                    break;

                }

                if (previousFrame) {

                    const delay =
                        ((frame.timestamp - previousFrame.timestamp) * 1000)
                        / this.speed;

                    if (delay > 0) {

                        await this.sleep(delay);

                    }

                }

                await onFrame(frame);

                previousFrame = frame;

            }

            if (this.loop && this.running) {

                console.log("\nRestarting replay...\n");

                await this.frameSource.reset();

            }

        } while (this.loop && this.running);

        this.running = false;

    }

    stop() {

        this.running = false;

    }

    setSpeed(speed) {

        if (speed <= 0) {
            throw new Error("Replay speed must be greater than zero.");
        }

        this.speed = speed;

    }

    getSpeed() {

        return this.speed;

    }

    isRunning() {

        return this.running;

    }

    sleep(ms) {

        return new Promise(resolve => setTimeout(resolve, ms));

    }

}

module.exports = ReplayEngine;