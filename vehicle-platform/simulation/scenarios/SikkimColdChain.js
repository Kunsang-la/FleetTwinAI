const SikkimColdChain = {

    id: "SIKKIM_COLD_CHAIN_001",

    name: "Gangtok → Singtam → Namchi",

    vehicle: {
        id: "FT-SK-001",
        registrationNumber: "SK-01-CC-001",
        type: "REFRIGERATED_TRUCK"
    },

    cargo: {
        type: "Vaccines",
        quantity: 120,
        unit: "Boxes",

        temperature: {
            target: 4,
            minimum: 2,
            maximum: 8,
            maxExcursionSeconds: 180
        },

        humidity: {
            target: 60,
            minimum: 40,
            maximum: 70
        }
    },

    route: {

        origin: {
            name: "Gangtok",
            latitude: 27.3389,
            longitude: 88.6065
        },

        waypoints: [

            {
                name: "Singtam",
                latitude: 27.2347,
                longitude: 88.5014
            }

        ],

        destination: {
            name: "Namchi",
            latitude: 27.1667,
            longitude: 88.3639
        }

    },

    environment: {

        weather: "Clear",

        ambientTemperature: 20,

        humidity: 65,

        windSpeed: 8,

        roadType: "Mountain",

        roadCondition: "Good",

        traffic: "Medium"

    },

    simulation: {

        tickInterval: 1000,

        initialSpeed: 25,

        cruiseSpeed: 40,

        maximumSpeed: 55

    }

};

module.exports = SikkimColdChain;