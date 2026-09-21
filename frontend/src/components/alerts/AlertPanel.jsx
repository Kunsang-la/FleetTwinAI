import React from "react";

const AlertPanel = ({ alerts = [] }) => {

    return (
        <div className="card">

            <h3 className="card-header">
                Cold-Chain Alerts
            </h3>

            {alerts.length === 0 ? (

                <div className="text-green-400">
                    ✓ No active alerts
                </div>

            ) : (

                <div className="space-y-3">

                    {alerts.map((alert) => (

                        <div
                            key={alert.id}
                            className="border border-red-500/40 bg-red-500/10 rounded-lg p-3"
                        >

                            <div className="flex justify-between">

                                <strong className="text-red-400">
                                    {alert.severity}
                                </strong>

                                <span className="text-gray-500 text-sm">
                                    {new Date(
                                        alert.timestamp
                                    ).toLocaleTimeString()}
                                </span>

                            </div>

                            <p className="text-gray-300 mt-1">
                                {alert.message}
                            </p>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default AlertPanel;