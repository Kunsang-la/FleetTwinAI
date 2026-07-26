/**
 * Represents one decoded signal.
 */
class Signal {

    constructor({
        category,
        key,
        name,
        value,
        unit = "",
        timestamp = null
    }) {

        this.category = category;
        this.key = key;
        this.name = name;
        this.value = value;
        this.unit = unit;
        this.timestamp = timestamp;

    }

}

module.exports = Signal;
