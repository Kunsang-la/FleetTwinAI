import React from "react";

const EventLog = ({ events = [] }) => {

    return (
        <div className="card">

            <h3 className="card-header">
                Operational Events
            </h3>

            {events.length === 0 ? (

                <div className="text-gray-400">
                    No operational events recorded
                </div>

            ) : (

                <div className="space-y-3">

                    {[...events].reverse().map((event, index) => (

                        <div
                            key={`${event.id}-${index}`}
                            className="border border-gray-700 rounded-lg p-3"
                        >

                            <div className="flex justify-between items-center">

                                <strong
                                    className={
                                        event.severity === "CRITICAL"
                                            ? "text-red-400"
                                            : "text-blue-400"
                                    }
                                >
                                    {event.type}
                                </strong>

                                <span className="text-gray-500 text-sm">
                                    {new Date(
                                        event.timestamp
                                    ).toLocaleTimeString()}
                                </span>

                            </div>

                            <p className="text-gray-300 mt-1">
                                {event.message}
                            </p>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default EventLog;