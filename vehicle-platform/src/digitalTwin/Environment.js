class Environment {
    constructor() {
        this.location = {
            latitude: 0,
            longitude: 0,
            altitude: 0              // meters
        };

        this.weather = {
            condition: "Clear",      // Clear, Rain, Snow, Fog, etc.
            ambientTemperature: 25,  // °C
            humidity: 60,            // %
            windSpeed: 0             // km/h
        };

        this.road = {
            type: "Highway",         // Highway, Mountain, Urban, Rural
            gradient: 0,             // %
            condition: "Good"        // Good, Wet, Slippery, Damaged
        };

        this.traffic = {
            level: "Low",            // Low, Medium, High
            delay: 0                 // minutes
        };

        this.risk = {
            landslide: false,
            flood: false,
            roadClosure: false
        };
    }
}

module.exports = Environment;