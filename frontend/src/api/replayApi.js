import client from "./client";

export const startReplay = () =>
    client.post("/replay/start");

export const pauseReplay = () =>
    client.post("/replay/pause");

export const stopReplay = () =>
    client.post("/replay/stop");

export const getReplayStatus = () =>
    client.get("/replay/status");