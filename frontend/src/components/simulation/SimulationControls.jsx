import { useEffect, useState } from "react";

import {
    getSimulationStatus,
    startSimulation,
    pauseSimulation,
    resumeSimulation,
    stopSimulation
} from "../../api/simulationApi";

function SimulationControls() {

    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const refreshStatus = async () => {

        try {

            const data = await getSimulationStatus();

            setStatus(data);

        } catch (error) {

            console.error(
                "Failed to get simulation status:",
                error
            );

        }

    };

    useEffect(() => {

        refreshStatus();

        const interval = setInterval(
            refreshStatus,
            2000
        );

        return () => clearInterval(interval);

    }, []);

    const handleAction = async (action) => {

        try {

            setLoading(true);

            const data = await action();

            setStatus(data.status);

        } catch (error) {

            console.error(
                "Simulation action failed:",
                error
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="simulation-controls">

            <h3>Simulation Control</h3>

            <div className="simulation-status">

                <span>
                    Status:
                </span>

                <strong>
                    {status?.paused
                        ? "PAUSED"
                        : status?.running
                            ? "RUNNING"
                            : "STOPPED"}
                </strong>

            </div>

            <div className="simulation-buttons">

                <button
                    onClick={() =>
                        handleAction(startSimulation)
                    }
                    disabled={
                        loading ||
                        status?.running
                    }
                >
                    ▶ Start
                </button>

                <button
                    onClick={() =>
                        handleAction(pauseSimulation)
                    }
                    disabled={
                        loading ||
                        !status?.running ||
                        status?.paused
                    }
                >
                    ⏸ Pause
                </button>

                <button
                    onClick={() =>
                        handleAction(resumeSimulation)
                    }
                    disabled={
                        loading ||
                        !status?.running ||
                        !status?.paused
                    }
                >
                    ▶ Resume
                </button>

                <button
                    onClick={() =>
                        handleAction(stopSimulation)
                    }
                    disabled={
                        loading ||
                        !status?.running
                    }
                >
                    ■ Stop
                </button>

            </div>

            {status && (
                <div className="simulation-info">

                    <div>
                        <span>Scenario</span>
                        <strong>
                            {status.scenario}
                        </strong>
                    </div>

                    <div>
                        <span>Distance</span>
                        <strong>
                            {status.distanceTravelledKm} km
                        </strong>
                    </div>

                    <div>
                        <span>Remaining</span>
                        <strong>
                            {status.distanceRemainingKm} km
                        </strong>
                    </div>

                    <div>
                        <span>Progress</span>
                        <strong>
                            {status.progress}%
                        </strong>
                    </div>

                </div>
            )}

        </div>
    );
}

export default SimulationControls;