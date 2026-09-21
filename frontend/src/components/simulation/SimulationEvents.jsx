import React, { useState } from "react";

import {
    triggerRefrigerationFailure,
    recoverRefrigeration,
    openCargoDoor,
    closeCargoDoor,
    triggerOverspeed,
    recoverOverspeed
} from "../../api/simulationApi";

const SimulationEvents = () => {

    const [loading, setLoading] = useState(false);

    const runEvent = async (action, errorMessage) => {

        try {

            setLoading(true);

            await action();

        } catch (error) {

            console.error(errorMessage, error);

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="card">

            <h3 className="card-header">
                Simulation Events
            </h3>

            <div className="flex flex-col gap-3">

                {/* Refrigeration */}

                <button
                    onClick={() =>
                        runEvent(
                            triggerRefrigerationFailure,
                            "Failed to trigger refrigeration failure:"
                        )
                    }
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50"
                >
                    Trigger Refrigeration Failure
                </button>

                <button
                    onClick={() =>
                        runEvent(
                            recoverRefrigeration,
                            "Failed to recover refrigeration:"
                        )
                    }
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50"
                >
                    Recover Refrigeration
                </button>


                {/* Cargo Door */}

                <button
                    onClick={() =>
                        runEvent(
                            openCargoDoor,
                            "Failed to open cargo door:"
                        )
                    }
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50"
                >
                    Open Cargo Door
                </button>

                <button
                    onClick={() =>
                        runEvent(
                            closeCargoDoor,
                            "Failed to close cargo door:"
                        )
                    }
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50"
                >
                    Close Cargo Door
                </button>


                {/* Overspeed */}

                <button
                    onClick={() =>
                        runEvent(
                            triggerOverspeed,
                            "Failed to trigger overspeed:"
                        )
                    }
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
                >
                    Trigger Overspeed
                </button>

                <button
                    onClick={() =>
                        runEvent(
                            recoverOverspeed,
                            "Failed to recover overspeed:"
                        )
                    }
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50"
                >
                    Recover Overspeed
                </button>

            </div>

        </div>
    );
};

export default SimulationEvents;