class Refrigeration {
    constructor() {
        this.enabled = true;

        this.currentTemperature = 4.0;      // °C
        this.targetTemperature = 4.0;       // °C

        this.compressor = {
            running: true,
            speed: 0,                       // RPM (future)
            powerConsumption: 0             // kW
        };

        this.evaporator = {
            temperature: 0                  // °C
        };

        this.condenser = {
            temperature: 0                  // °C
        };

        this.door = {
            open: false,
            openDuration: 0                 // seconds
        };

        this.defrost = {
            active: false
        };

        this.health = {
            status: "NORMAL",               // NORMAL, WARNING, CRITICAL
            fault: null
        };
    }
}

module.exports = Refrigeration;

