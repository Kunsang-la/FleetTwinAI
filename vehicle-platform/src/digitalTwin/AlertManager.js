class AlertManager {

    constructor() {

        this.alerts = [];

        this.history = [];

        this.events = [];

        this.nextId = 1;

    }

    checkTemperature(temperature, minimum, maximum) {

        if (
            temperature == null ||
            minimum == null ||
            maximum == null
        ) {
            return;
        }

        if (temperature < minimum) {

            this.addAlert({
                type: "TEMPERATURE_LOW",
                severity: "CRITICAL",
                message:
                    `Cargo temperature is below safe limit: ${temperature.toFixed(2)}°C`
            });

        } else if (temperature > maximum) {

            this.addAlert({
                type: "TEMPERATURE_HIGH",
                severity: "CRITICAL",
                message:
                    `Cargo temperature is above safe limit: ${temperature.toFixed(2)}°C`
            });

        } else {

            this.removeAlert("TEMPERATURE_LOW");
            this.removeAlert("TEMPERATURE_HIGH");

        }

    }
    addAlert(alert) {

        const existing = this.alerts.find(
            item => item.type === alert.type
        );

        if (existing) {
            return;
        }

        const newAlert = {
            id: this.nextId++,
            timestamp: new Date().toISOString(),
            ...alert
        };

        this.alerts.push(newAlert);

        this.history.push({
            ...newAlert,
            event: "TRIGGERED"
        });

    }

    removeAlert(type) {

        const alert = this.alerts.find(
            item => item.type === type
        );

        if (!alert) {
            return;
        }

        this.alerts =
            this.alerts.filter(
                item => item.type !== type
            );

        this.history.push({
            ...alert,
            timestamp: new Date().toISOString(),
            event: "CLEARED"
        });

    }

    getAlerts() {

        return this.alerts;

    }
    getHistory() {

    return this.history;

    }
    logEvent(event) {

    this.events.push({
        id: this.nextId++,
        timestamp: new Date().toISOString(),
        ...event
    });

    }
    getEvents() {

    return this.events;

    }

    clearAlerts() {

        this.alerts = [];

    }

}

module.exports = AlertManager;