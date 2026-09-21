const RouteService = require("./RouteService");

async function test() {

    const routeService = new RouteService();

    const route = await routeService.getRoute(
        {
            latitude: 27.3389,
            longitude: 88.6065
        },
        {
            latitude: 27.1667,
            longitude: 88.3639
        }
    );

    console.log("Route distance:", route.distanceKm, "km");

    console.log(
        "Route duration:",
        Math.round(route.durationSeconds / 60),
        "minutes"
    );

    console.log(
        "Number of road points:",
        route.points.length
    );

    console.log(
        "First point:",
        route.points[0]
    );

    console.log(
        "Last point:",
        route.points[route.points.length - 1]
    );
}

test().catch(error => {
    console.error(
        "Route test failed:",
        error.message
    );
});