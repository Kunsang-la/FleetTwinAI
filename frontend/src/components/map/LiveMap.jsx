import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LiveMap.css";

// Fix default marker icons for Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


// Keeps the map centered on the moving vehicle
const MapFollower = ({ position }) => {

  const map = useMap();

  useEffect(() => {

    if (!position) {
      return;
    }

    map.setView(position, map.getZoom(), {
      animate: true
    });

  }, [position, map]);

  return null;
};


const LiveMap = ({ data }) => {

  // Get vehicle position from the Digital Twin
  const latitude =
    data?.environment?.location?.latitude ??
    27.3389;

  const longitude =
    data?.environment?.location?.longitude ??
    88.6065;

  const position = [
    latitude,
    longitude
  ];

  return (
    <div className="live-map-container">

      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
      >

        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapFollower position={position} />

        <Marker position={position}>

          <Popup>
            <strong>FleetTwin AI Vehicle</strong>
            <br />
            Latitude: {latitude.toFixed(5)}
            <br />
            Longitude: {longitude.toFixed(5)}
          </Popup>

        </Marker>

      </MapContainer>

    </div>
  );
};

export default LiveMap;