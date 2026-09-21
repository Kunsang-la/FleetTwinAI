import React from "react";

const AlertHistory = ({ history = [] }) => {

    return (
        <div className="card">

            <h3 className="card-header">
                Alert History
            </h3>

            {history.length === 0 ? (

                <div className="text-gray-400">
                    No alert events recorded
                </div>

            ) : (

                <div className="space-y-3">

                    {[...history].reverse().map((event, index) => (

                        <div
                            key={`${event.id}-${event.event}-${index}`}
                            className="border border-gray-700 rounded-lg p-3"
                        >

                            <div className="flex justify-between items-center">

                                <strong
                                    className={
                                        event.event === "TRIGGERED"
                                            ? "text-red-400"
                                            : "text-green-400"
                                    }
                                >
                                    {event.event}
                                </strong>

                                <span className="text-gray-500 text-sm">
                                    {new Date(
                                        event.timestamp
                                    ).toLocaleTimeString()}
                                </span>

                            </div>

                            <div className="text-gray-300 mt-1">
                                {event.type}
                            </div>

                            <div className="text-gray-400 text-sm mt-1">
                                {event.message}
                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default AlertHistory;