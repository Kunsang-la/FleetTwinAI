const express = require("express");
const cors = require("cors");

const vehicleRoutes = require("./routes/vehicleRoutes");
const replayRoutes = require("./routes/replayRoutes");
const digitalTwinRoutes = require("./routes/digitalTwinRoutes");
const simulationRoutes = require("./routes/simulationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", vehicleRoutes);
app.use("/api/replay", replayRoutes);
app.use("/api/digitalTwin", digitalTwinRoutes);
app.use("/api/simulation", simulationRoutes);

module.exports = app;