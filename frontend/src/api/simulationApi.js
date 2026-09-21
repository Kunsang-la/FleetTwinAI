import client from "./client";

export const getSimulationStatus = async () => {
    const response = await client.get("/simulation/status");
    return response.data;
};

export const startSimulation = async () => {
    const response = await client.post("/simulation/start");
    return response.data;
};

export const pauseSimulation = async () => {
    const response = await client.post("/simulation/pause");
    return response.data;
};

export const resumeSimulation = async () => {
    const response = await client.post("/simulation/resume");
    return response.data;
};

export const stopSimulation = async () => {
    const response = await client.post("/simulation/stop");
    return response.data;
};
export const triggerRefrigerationFailure = async () => {
    const response = await client.post(
        "/simulation/events/refrigeration-failure"
    );

    return response.data;
};


export const recoverRefrigeration = async () => {
    const response = await client.post(
        "/simulation/events/refrigeration-recover"
    );

    return response.data;
};
export const openCargoDoor = async () => {

    const response = await client.post(
        "/simulation/events/cargo-door-open"
    );

    return response.data;

};

export const closeCargoDoor = async () => {

    const response = await client.post(
        "/simulation/events/cargo-door-close"
    );

    return response.data;

};
export const triggerOverspeed = async () => {

    const response = await client.post(
        "/simulation/events/overspeed"
    );

    return response.data;

};

export const recoverOverspeed = async () => {

    const response = await client.post(
        "/simulation/events/overspeed-recover"
    );

    return response.data;

};