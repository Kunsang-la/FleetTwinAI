class Cargo {
    constructor() {
        this.type = "Vaccines";

        this.quantity = {
            value: 0,
            unit: "Boxes"
        };

        this.temperature = {
            current: 4.0,
            minimum: 2.0,
            maximum: 8.0
        };

        this.humidity = {
            current: 60,
            minimum: 40,
            maximum: 70
        };

        this.quality = {
            score: 100,                  // 0–100%
            status: "GOOD"               // GOOD, WARNING, CRITICAL
        };

        this.status = {
            riskLevel: "LOW",            // LOW, MEDIUM, HIGH
            spoiled: false
        };
    }
}

module.exports = Cargo;