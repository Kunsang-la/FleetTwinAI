class Delivery {

    constructor() {

        this.route = {
            origin: "",
            destination: "",
            currentLocation: "",
            totalDistance: 0,         // km
            distanceRemaining: 0      // km
        };

        this.schedule = {
            departureTime: null,
            estimatedArrival: null,
            actualArrival: null
        };

        this.progress = {
            percentage: 0,
            status: "NOT_STARTED"     // NOT_STARTED, IN_TRANSIT, DELIVERED, DELAYED
        };

        this.driver = {
            id: "",
            name: ""
        };

        this.vehicle = {
            id: "",
            registrationNumber: ""
        };

    }

    toJSON() {
        return {
            route: this.route,
            schedule: this.schedule,
            progress: this.progress,
            driver: this.driver,
            vehicle: this.vehicle
        };
    }

}

module.exports = Delivery;