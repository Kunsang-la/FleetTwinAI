import { useState, useEffect } from "react";
import { fetchDigitalTwin } from "../api/digitalTwin";

export default function useDigitalTwin() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {

        const load = async () => {

            try {

                const twin = await fetchDigitalTwin();

                setData(twin);
                setConnected(true);
                setLoading(false);

            } catch (err) {

                setConnected(false);
                setError(err);
                setLoading(false);

            }

        };

        load();

        const interval = setInterval(load, 500);

        return () => clearInterval(interval);

    }, []);

    return {
        data,
        loading,
        error,
        connected
    };
}