const axios = require("axios");
const SikkimColdChain = require("./scenarios/SikkimColdChain");
const RouteService = require("./RouteService");

class SimulationEngine {

    constructor(digitalTwin) {

        this.digitalTwin = digitalTwin;
        this.scenario = SikkimColdChain;

        this.running = false;
        this.paused = false;
        this.timer = null;

        this.elapsedSeconds = 0;

        this.routeService = new RouteService();

        this.routePoints = [];
        this.routeDistanceKm = 0;
        this.routeDurationSeconds = 0;

        this.routeReady = false;

        this.currentSegment = 0;
        this.segmentProgress = 0;

        this.currentPosition = {
            latitude: this.scenario.route.origin.latitude,
            longitude: this.scenario.route.origin.longitude
        };

        this.distanceTravelledKm = 0;
        this.currentSpeed = 0;
        this.events = {
            refrigerationFailure: false,
            temperatureExcursionSeconds: 0,
            previousCargoStatus: "GOOD",
            cargoDoorOpen: false,
            overspeed: false
        };
    }

    async start() {

        if (this.running) {
            return;
        }

        const origin = this.scenario.route.origin;

        const destination = this.scenario.route.destination;

        try {

            const route = await this.routeService.getRoute(
                origin,
                destination
            );

            this.routePoints = route.points;

            this.routeDistanceKm = route.distanceKm;

            this.routeDurationSeconds = route.durationSeconds;

            this.totalDistanceKm = route.distanceKm;

            this.routeReady = true;

            console.log(
                `[Simulation] Route loaded: ${this.routeDistanceKm.toFixed(2)} km`
            );

            console.log(
                `[Simulation] Road points: ${this.routePoints.length}`
            );

        } catch (error) {

            console.error(
                "[Simulation] Failed to load route:",
                error.message
            );

            return;
        }

        this.running = true;
        this.paused = false;

        this.startTime = Date.now();

        this.interval = setInterval(
            () => this.tick(),
            this.scenario.simulation.tickInterval
        );

        console.log(
            `[Simulation] Started: ${this.scenario.name}`
        );
    }
    async updateETA() {

    try {

        const currentLocation = this.currentPosition;
        const destination = this.scenario.route.destination;

        const response = await axios.post(
            "https://routes.googleapis.com/directions/v2:computeRoutes",
            {
                origin: {
                    location: {
                        latLng: {
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude
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

                computeAlternativeRoutes: false,

                routeModifiers: {
                    avoidTolls: false,
                    avoidHighways: false,
                    avoidFerries: false
                }
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
                    "X-Goog-FieldMask":
                        "routes.duration,routes.distanceMeters"
                }
            }
        );

        const route = response.data?.routes?.[0];

        if (!route) {
            console.warn("[Simulation] No ETA route returned");
            return;
        }

        const durationSeconds =
            parseInt(route.duration?.replace("s", ""), 10);

        const delivery =
            this.digitalTwin.delivery;

        delivery.schedule.estimatedArrival =
            new Date(
                Date.now() + durationSeconds * 1000
            ).toISOString();

        delivery.schedule.etaSeconds =
            durationSeconds;

        delivery.schedule.etaMinutes =
            Math.ceil(durationSeconds / 60);

        delivery.route.etaDistanceKm =
            Number(
                (route.distanceMeters / 1000).toFixed(2)
            );

    } catch (error) {

        console.error(
            "[Simulation] ETA update failed:",
            error.response?.data || error.message
        );
    }
}

    stop() {

        if (this.interval) {
            clearInterval(this.interval);
        }

        this.interval = null;
        this.running = false;
        this.paused = false;

        this.elapsedSeconds = 0;
        this.currentSegment = 0;
        this.segmentProgress = 0;
        this.distanceTravelledKm = 0;

        this.events.refrigerationFailure = false;
        this.events.temperatureExcursionSeconds = 0;
        this.events.previousCargoStatus = "GOOD";
        this.events.cargoDoorOpen = false;
        this.events.overspeed = false;

        const cargo = this.digitalTwin.cargo;

        cargo.quality.score = 100;
        cargo.quality.status = "GOOD";

        cargo.status.riskLevel = "LOW";
        cargo.status.spoiled = false;
                

        this.currentPosition = {
            latitude: this.scenario.route.origin.latitude,
            longitude: this.scenario.route.origin.longitude
        };

        console.log("[Simulation] Stopped");
    }

    pause() {

        if (!this.running) return;

        this.paused = true;

        console.log("[Simulation] Paused");
    }

    resume() {

        if (!this.running) return;

        this.paused = false;

        console.log("[Simulation] Resumed");
    }

    tick() {

        if (!this.running || this.paused) {
            return;
        }

       this.elapsedSeconds++;

        this.currentSpeed = this.calculateSpeed();

        this.updatePosition();
        this.updateVehicle();
        this.updateEnvironment();
        this.updateRefrigeration();
        this.updateCargo();
        this.updateDelivery();
        if (this.elapsedSeconds % 30 === 0) {
            this.updateETA();
        }
        this.digitalTwin.checkAlerts();
        this.digitalTwin.updateTimestamp();
    }

    updatePosition() {

        const speedKmph = this.currentSpeed;

        // Distance travelled during this 1-second tick.
        const distanceThisTickKm =
            speedKmph / 3600;

        this.distanceTravelledKm += distanceThisTickKm;

        let remainingDistance = distanceThisTickKm;

        while (
            remainingDistance > 0 &&
            this.currentSegment < this.routePoints.length - 1
        ) {

            const start =
                this.routePoints[this.currentSegment];

            const end =
                this.routePoints[this.currentSegment + 1];

            const segmentDistance =
                this.haversineKm(
                    start.latitude,
                    start.longitude,
                    end.latitude,
                    end.longitude
                );

            const distanceRemainingInSegment =
                segmentDistance *
                (1 - this.segmentProgress);

            if (remainingDistance < distanceRemainingInSegment) {

                this.segmentProgress +=
                    remainingDistance / segmentDistance;

                remainingDistance = 0;

            } else {

                remainingDistance -=
                    distanceRemainingInSegment;

                this.currentSegment++;

                this.segmentProgress = 0;
            }
        }

        this.interpolatePosition();
    }

    interpolatePosition() {

        const start =
            this.routePoints[
                Math.min(
                    this.currentSegment,
                    this.routePoints.length - 1
                )
            ];

        const end =
            this.routePoints[
                Math.min(
                    this.currentSegment + 1,
                    this.routePoints.length - 1
                )
            ];

        this.currentPosition.latitude =
            start.latitude +
            (end.latitude - start.latitude) *
            this.segmentProgress;

        this.currentPosition.longitude =
            start.longitude +
            (end.longitude - start.longitude) *
            this.segmentProgress;
    }

    updateVehicle() {

        const vehicle = this.digitalTwin.vehicle;

        const speed = this.currentSpeed;

        vehicle.motion.speed = speed;

        vehicle.motion.distance =
            Number(this.distanceTravelledKm.toFixed(2));

        vehicle.motion.heading =
            this.calculateHeading();

        vehicle.motion.acceleration = 0;

        vehicle.engine.rpm =
            Math.round(900 + speed * 35);

        vehicle.engine.coolantTemp =
            Math.round(72 + speed * 0.12);

        vehicle.fuel.level =
            Math.max(
                0,
                100 - this.elapsedSeconds * 0.015
            );
    }

    updateEnvironment() {

        const environment =
            this.digitalTwin.environment;

        environment.location.latitude =
            Number(
                this.currentPosition.latitude.toFixed(6)
            );

        environment.location.longitude =
            Number(
                this.currentPosition.longitude.toFixed(6)
            );

        environment.location.altitude =
            Math.round(
                1650 +
                Math.sin(this.elapsedSeconds / 20) * 50
            );

        environment.weather.condition =
            this.scenario.environment.weather;

        environment.weather.ambientTemperature =
            this.scenario.environment.ambientTemperature;

        environment.weather.humidity =
            this.scenario.environment.humidity;

        environment.weather.windSpeed =
            this.scenario.environment.windSpeed;

        environment.road.type =
            this.scenario.environment.roadType;

        environment.road.condition =
            this.scenario.environment.roadCondition;

        environment.traffic.level =
            this.scenario.environment.traffic;
    }

    updateRefrigeration() {

        const refrigeration =
            this.digitalTwin.refrigeration;
        refrigeration.door.open =
            this.events.cargoDoorOpen;

        if (this.events.refrigerationFailure) {

            // Refrigeration system has failed
            refrigeration.compressor.running = false;
            refrigeration.health.status = "FAULT";

            // Temperature gradually increases after failure
            refrigeration.currentTemperature =
                Number(
                    (
                        refrigeration.currentTemperature + 0.08
                    ).toFixed(2)
                );

       } else {

        if (this.events.cargoDoorOpen) {

            refrigeration.currentTemperature =
                Number(
                    (
                        refrigeration.currentTemperature + 0.03
                    ).toFixed(2)
                );

        } else {

            refrigeration.currentTemperature =
                Number(
                    (
                        4 +
                        Math.sin(this.elapsedSeconds / 20) * 0.15
                    ).toFixed(2)
                );

        }

        refrigeration.compressor.running = true;

        refrigeration.health.status = "NORMAL";
    }
        
        refrigeration.targetTemperature = 4;
    }

    updateCargo() {

        const cargo = this.digitalTwin.cargo;

        const temperature =
            this.digitalTwin.refrigeration.currentTemperature;

        const minimum =
            this.scenario.cargo.temperature.minimum;

        const maximum =
            this.scenario.cargo.temperature.maximum;

        cargo.type =
            this.scenario.cargo.type;

        cargo.quantity = {
            value: this.scenario.cargo.quantity,
            unit: this.scenario.cargo.unit
        };

        cargo.temperature = {
            current: temperature,
            minimum,
            maximum
        };

        cargo.humidity = {
            current: this.digitalTwin.environment.weather.humidity,
            minimum: this.scenario.cargo.humidity.minimum,
            maximum: this.scenario.cargo.humidity.maximum
        };

        /*
        * Cargo risk assessment
        */

        if (temperature < minimum || temperature > maximum) {

            this.events.temperatureExcursionSeconds++;

            const maxExcursionSeconds =
                this.scenario.cargo.temperature.maxExcursionSeconds;

            if (
                this.events.temperatureExcursionSeconds >=
                maxExcursionSeconds
            ) {

                cargo.quality.score = 0;
                cargo.quality.status = "SPOILED";

                cargo.status.riskLevel = "CRITICAL";
                cargo.status.spoiled = true;

            } else if (
                this.events.temperatureExcursionSeconds >= 60
            ) {

                cargo.quality.score = 40;
                cargo.quality.status = "COMPROMISED";

                cargo.status.riskLevel = "CRITICAL";
                cargo.status.spoiled = false;
                if (this.events.previousCargoStatus !== "COMPROMISED") {

                    this.digitalTwin.alertManager.logEvent({
                        type: "CARGO_COMPROMISED",
                        severity: "CRITICAL",
                        message: "Cargo has experienced a prolonged temperature excursion"
                    });

                }

                this.events.previousCargoStatus = "COMPROMISED";

            } else {

                cargo.quality.score = 70;
                cargo.quality.status = "AT_RISK";

                cargo.status.riskLevel = "HIGH";
                cargo.status.spoiled = false;
                if (this.events.previousCargoStatus !== "AT_RISK") {

                    this.digitalTwin.alertManager.logEvent({
                        type: "CARGO_AT_RISK",
                        severity: "WARNING",
                        message: "Cargo temperature has exceeded the safe range"
                    });

                }

                this.events.previousCargoStatus = "AT_RISK";

            }

        } else {

            this.events.temperatureExcursionSeconds = 0;

            if (cargo.status.spoiled) {

                cargo.quality.score = 0;
                cargo.quality.status = "SPOILED";

                cargo.status.riskLevel = "CRITICAL";
                cargo.status.spoiled = true;

            } else {

                cargo.quality.score = 100;
                cargo.quality.status = "GOOD";

                cargo.status.riskLevel = "LOW";
                cargo.status.spoiled = false;

            }

        }
        console.log(
            "[Cargo]",
            "Temperature:", temperature,
            "Quality:", cargo.quality.status,
            "Risk:", cargo.status.riskLevel
        );

    }

    updateDelivery() {

        const delivery =
            this.digitalTwin.delivery;

        delivery.route.origin =
            this.scenario.route.origin.name;

        delivery.route.destination =
            this.scenario.route.destination.name;

        delivery.route.currentLocation =
            `${this.currentPosition.latitude.toFixed(5)}, ` +
            `${this.currentPosition.longitude.toFixed(5)}`;

        delivery.route.totalDistance =
            Number(this.totalDistanceKm.toFixed(2));

        delivery.route.distanceRemaining =
            Number(
                Math.max(
                    0,
                    this.totalDistanceKm -
                    this.distanceTravelledKm
                ).toFixed(2)
            );

        const progress =
            Math.min(
                100,
                (
                    this.distanceTravelledKm /
                    this.totalDistanceKm
                ) * 100
            );

        delivery.progress.percentage =
            Number(progress.toFixed(1));

        delivery.progress.status =
            progress >= 100
                ? "DELIVERED"
                : "IN_TRANSIT";
    }

   calculateSpeed() {

        const initialSpeed =
            this.scenario.simulation.initialSpeed;

        const cruiseSpeed =
            this.scenario.simulation.cruiseSpeed;

        const maximumSpeed =
            this.scenario.simulation.maximumSpeed;

        const variation =
            Math.sin(this.elapsedSeconds / 8) * 5;

        if (this.events.overspeed) {

            return maximumSpeed + 20;

        }

        return Math.min(
            maximumSpeed,
            Math.max(
                initialSpeed,
                cruiseSpeed + variation
            )
        );

    }

    calculateHeading() {

        const start =
            this.routePoints[
                Math.min(
                    this.currentSegment,
                    this.routePoints.length - 2
                )
            ];

        const end =
            this.routePoints[
                Math.min(
                    this.currentSegment + 1,
                    this.routePoints.length - 1
                )
            ];

        const latDiff =
            end.latitude - start.latitude;

        const lonDiff =
            end.longitude - start.longitude;

        const heading =
            Math.atan2(lonDiff, latDiff) *
            180 / Math.PI;

        return Math.round(
            (heading + 360) % 360
        );
    }

    calculateTotalDistance() {

        let total = 0;

        for (
            let i = 0;
            i < this.routePoints.length - 1;
            i++
        ) {

            total += this.haversineKm(
                this.routePoints[i].latitude,
                this.routePoints[i].longitude,

                this.routePoints[i + 1].latitude,
                this.routePoints[i + 1].longitude
            );
        }

        return total;
    }

    haversineKm(
        lat1,
        lon1,
        lat2,
        lon2
    ) {

        const R = 6371;

        const toRad =
            degrees =>
                degrees * Math.PI / 180;

        const dLat =
            toRad(lat2 - lat1);

        const dLon =
            toRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;

        return (
            2 *
            R *
            Math.asin(Math.sqrt(a))
        );
    }
    triggerRefrigerationFailure() {

        if (this.events.refrigerationFailure) {
            return;
        }

        this.events.refrigerationFailure = true;

        this.digitalTwin.alertManager.logEvent({
            type: "REFRIGERATION_FAILURE",
            severity: "CRITICAL",
            message: "Refrigeration system failure triggered"
        });

        console.log(
            "[Simulation] Refrigeration failure triggered"
        );

    }

    clearRefrigerationFailure() {

        if (!this.events.refrigerationFailure) {
            return;
        }

        this.events.refrigerationFailure = false;

        this.digitalTwin.alertManager.logEvent({
            type: "REFRIGERATION_RECOVERY",
            severity: "INFO",
            message: "Refrigeration system recovered"
        });

        console.log(
            "[Simulation] Refrigeration failure cleared"
        );

    }
    triggerCargoDoorOpen() {

        if (this.events.cargoDoorOpen) {
            return;
        }

        this.events.cargoDoorOpen = true;

        this.digitalTwin.alertManager.logEvent({
            type: "CARGO_DOOR_OPEN",
            severity: "WARNING",
            message: "Cargo compartment door opened"
        });

        console.log(
            "[Simulation] Cargo door opened"
        );

    }

    clearCargoDoorOpen() {

        if (!this.events.cargoDoorOpen) {
            return;
        }

        this.events.cargoDoorOpen = false;

        this.digitalTwin.alertManager.logEvent({
            type: "CARGO_DOOR_CLOSED",
            severity: "INFO",
            message: "Cargo compartment door closed"
        });

        console.log(
            "[Simulation] Cargo door closed"
        );

    }
    triggerOverspeed() {

        if (this.events.overspeed) {
            return;
        }

        this.events.overspeed = true;

        this.digitalTwin.alertManager.logEvent({
            type: "OVERSPEED",
            severity: "WARNING",
            message: "Vehicle speed has exceeded the configured limit"
        });

        console.log(
            "[Simulation] Overspeed anomaly triggered"
        );

    }

    clearOverspeed() {

        if (!this.events.overspeed) {
            return;
        }

        this.events.overspeed = false;

        this.digitalTwin.alertManager.logEvent({
            type: "OVERSPEED_RECOVERY",
            severity: "INFO",
            message: "Vehicle speed returned to normal"
        });

        console.log(
            "[Simulation] Overspeed anomaly cleared"
        );

    }

    getStatus() {

        return {

            running: this.running,

            paused: this.paused,

            elapsedSeconds:
                this.elapsedSeconds,

            scenario:
                this.scenario.name,

            position:
                this.currentPosition,

            vehicleId:
                this.scenario.vehicle.id,

            distanceTravelledKm:
                Number(
                    this.distanceTravelledKm.toFixed(2)
                ),

            distanceRemainingKm:
                Number(
                    Math.max(
                        0,
                        this.totalDistanceKm -
                        this.distanceTravelledKm
                    ).toFixed(2)
                ),

            progress:
                Number(
                    Math.min(
                        100,
                        (
                            this.distanceTravelledKm /
                            this.totalDistanceKm
                        ) * 100
                    ).toFixed(1)
                )
        };
    }
}

module.exports = SimulationEngine;