import client from "./client";

export const fetchDigitalTwin = async () => {
    const response = await client.get("/digitalTwin");
    return response.data;
};

export const fetchVehicle = async () => {
    const response = await client.get("/vehicle");
    return response.data;
};

export const fetchDelivery = async () => {
    const response = await client.get("/delivery");
    return response.data;
};

export const fetchCargo = async () => {
    const response = await client.get("/cargo");
    return response.data;
};

export const fetchRefrigeration = async () => {
    const response = await client.get("/refrigeration");
    return response.data;
};