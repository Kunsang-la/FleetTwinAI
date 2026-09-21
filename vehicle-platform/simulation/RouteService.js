const axios = require("axios");

class RouteService {

    async getRoute(origin, destination) {

        const url =
            `https://router.project-osrm.org/route/v1/driving/` +
            `${origin.longitude},${origin.latitude};` +
            `${destination.longitude},${destination.latitude}` +
            `?overview=full&geometries=geojson`;

        const response = await axios.get(url, {
            timeout: 30000
        });

        const route = response.data?.routes?.[0];

        if (!route) {
            throw new Error("No route returned from OSRM");
        }

        const coordinates = route.geometry.coordinates;

        return {
            distanceKm: route.distance / 1000,

            durationSeconds: route.duration,

            points: coordinates.map(([longitude, latitude]) => ({
                latitude,
                longitude
            }))
        };
    }
}

module.exports = RouteService;