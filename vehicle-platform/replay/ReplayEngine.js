/**
 * ==========================================================
 * FleetTwin AI
 * Replay Engine
 * ==========================================================
 *
 * Replays CAN frames according to recorded timestamps.
 */

class ReplayEngine {

    constructor(frameSource) {

        this.frameSource = frameSource;

        this.running = false;

    }

    async start(onFrame) {

        this.running = true;

        let previousFrame = null;

        while (this.running) {

            const frame = await this.frameSource.nextFrame();

            if (!frame) {

                console.log("\nReplay finished.");

                break;

            }

            if (previousFrame) {

                const delay =
                    (frame.timestamp - previousFrame.timestamp) * 1000;

                if (delay > 0) {

                    await new Promise(resolve =>
                        setTimeout(resolve, delay)
                    );

                }

            }

            await onFrame(frame);

            previousFrame = frame;

        }

    }

    stop() {

        this.running = false;

    }

}

module.exports = ReplayEngine;
