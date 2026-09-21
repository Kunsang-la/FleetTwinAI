class Vehicle {
    constructor() {
        this.engine = {
            rpm: 0,
            coolantTemp: 0,
            oilPressure: 0,
            load: 0
        };

        this.motion = {
            speed: 0,
            heading: 0,
            acceleration: 0
        };

        this.fuel = {
            level: 0,
            consumption: 0
        };

        this.electrical = {
            batteryVoltage: 0
        };

        this.diagnostics = {
            activeFaults: [],
            warningLamp: false
        };
    }
}

export default Vehicle;