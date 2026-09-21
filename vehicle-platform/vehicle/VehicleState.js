class VehicleState {

    constructor() {

        // -------------------------
        // Engine
        // -------------------------
        this.engine = {
            rpm: null,
            torqueMode: null,
            acceleratorPosition: null,
            engineHours: null
        };

        // -------------------------
        // Cooling
        // -------------------------
        this.cooling = {
            coolantTemperature: null,
            oilTemperature: null
        };

        // -------------------------
        // Motion
        // -------------------------
        this.motion = {
            speed: null,
            distance: 0
        };

        // -------------------------
        // Fuel
        // -------------------------
        this.fuel = {
            level: null,
            rate: null,
            economy: null
        };

        // -------------------------
        // Diagnostics
        // -------------------------
        this.diagnostics = {
            mil: false,
            amberWarning: false,
            redStop: false,
            protectLamp: false,
            activeDTCs: []
        };

        this.lastUpdated = null;
    }

    /**
     * Updates the vehicle state using decoded signals.
     */
    update(signalList) {

        for (const signal of signalList) {

            if (!this[signal.category]) {
                continue;
            }

            if (signal.key === "activeDTCs") {
                const newDtc = signal.value;
                const existing = this.diagnostics.activeDTCs.find(d => d.spn === newDtc.spn && d.fmi === newDtc.fmi);
                
                if (existing) {
                    existing.occurrenceCount += 1;
                } else {
                    this.diagnostics.activeDTCs.push(newDtc);
                }
            } else {

                this[signal.category][signal.key] = signal.value;

            }

        }

        this.lastUpdated = new Date();
    }

    /**
     * Returns the complete state as JSON.
     */
    toJSON() {

        return {

            engine: this.engine,
            cooling: this.cooling,
            motion: this.motion,
            fuel: this.fuel,
            diagnostics: this.diagnostics,
            lastUpdated: this.lastUpdated

        };

    }

    /**
     * Prints a concise summary.
     */
    printSummary() {

        console.table({

            RPM: this.engine.rpm,

            Speed: this.motion.speed,

            Coolant: this.cooling.coolantTemperature,

            Accelerator: this.engine.acceleratorPosition,

            MIL: this.diagnostics.mil,

            Amber: this.diagnostics.amberWarning,

            RedStop: this.diagnostics.redStop,

            DTCs: this.diagnostics.activeDTCs.length

        });

    }

    /**
     * Prints all active diagnostic trouble codes.
     */
    printDiagnostics() {

        console.log("\n========== Active DTCs ==========");

        if (this.diagnostics.activeDTCs.length === 0) {

            console.log("No active diagnostic trouble codes.\n");
            return;

        }

        console.table(

            this.diagnostics.activeDTCs.map((dtc, index) => ({

                "#": index + 1,

                SPN: dtc.spn,

                FMI: dtc.fmi,

                Occurrence: dtc.occurrenceCount

            }))

        );

    }

    /**
     * Clears active DTCs.
     */
    clearDTCs() {

        this.diagnostics.activeDTCs = [];

    }

}

module.exports = VehicleState;
