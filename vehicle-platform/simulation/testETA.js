require("dotenv").config();

const axios = require("axios");

async function testETA() {

    const origin = {
        latitude: 27.339,
        longitude: 88.606
    };

    const destination = {
        latitude: 27.1667,
        longitude: 88.3639
    };

    try {

        const response = await axios.post(
            "https://routes.googleapis.com/directions/v2:computeRoutes",

            {
                origin: {
                    location: {
                        latLng: {
                            latitude: origin.latitude,
                            longitude: origin.longitude
                        }
                    }
                },

                destination: {
                    location: {
                        latLng: {
                            latitude: destination.latitude,
                            longitude: destination.longitude
                        }
                    }
                },

                travelMode: "DRIVE",

                routingPreference: "TRAFFIC_AWARE",

                computeAlternativeRoutes: false
            },

            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key":
                        process.env.GOOGLE_MAPS_API_KEY,

                    "X-Goog-FieldMask":
                        "routes.duration,routes.distanceMeters"
                }
            }
        );

        const route = response.data?.routes?.[0];

        if (!route) {
            console.log("No route returned");
            return;
        }

        const durationSeconds =
            parseInt(route.duration.replace("s", ""), 10);

        const distanceKm =
            route.distanceMeters / 1000;

        console.log("\n===== GOOGLE ETA TEST =====");

        console.log(
            "Distance:",
            distanceKm.toFixed(2),
            "km"
        );

        console.log(
            "Duration:",
            Math.ceil(durationSeconds / 60),
            "minutes"
        );

        console.log(
            "ETA:",
            new Date(
                Date.now() +
                durationSeconds * 1000
            ).toLocaleString()
        );

        console.log("===========================\n");

    } catch (error) {

        console.error(
            "Google Routes API failed:"
        );

        console.error(
            error.response?.data ||
            error.message
        );
    }
}

testETA();