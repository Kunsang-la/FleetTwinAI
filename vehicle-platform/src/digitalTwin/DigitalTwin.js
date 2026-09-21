const VehicleState = require("../../vehicle/VehicleState");
const AlertManager = require("./AlertManager");
const Refrigeration = require("./Refrigeration");
const Cargo = require("./Cargo");
const Environment = require("./Environment");
const Delivery = require("./Delivery");

class DigitalTwin {

    constructor() {

        // Existing vehicle model (reused)
        this.vehicle = new VehicleState();

        // Cold chain models
        this.refrigeration = new Refrigeration();
        this.cargo = new Cargo();
        this.environment = new Environment();
        this.delivery = new Delivery();
        this.alertManager = new AlertManager();

        // Metadata
        this.createdAt = new Date();
        this.lastUpdated = null;

    }

    updateTimestamp() {
        this.lastUpdated = new Date();
    }
    checkAlerts() {

    this.alertManager.checkTemperature(
        this.cargo.temperature.current,
        this.cargo.temperature.minimum,
        this.cargo.temperature.maximum
    );

   }
   getAlerts() {

    return this.alertManager.getAlerts();

  }
   getAlertHistory() {

    return this.alertManager.getHistory();

  }
  getEvents() {

    return this.alertManager.getEvents();

  }

    getState() {

        return {
            vehicle: this.vehicle,
            refrigeration: this.refrigeration,
            cargo: this.cargo,
            environment: this.environment,
            delivery: this.delivery,

            alerts: this.getAlerts(),
            alertHistory: this.getAlertHistory(),
            events: this.getEvents(),

            createdAt: this.createdAt,
            lastUpdated: this.lastUpdated
        };

    }

}

module.exports = DigitalTwin;