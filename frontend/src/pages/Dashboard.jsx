import React from 'react';
import RPMGauge from '../components/gauges/RPMGauge';
import SpeedGauge from '../components/gauges/SpeedGauge';
import EngineCard from '../components/cards/EngineCard';
import MotionCard from '../components/cards/MotionCard';
import CoolingCard from '../components/cards/CoolingCard';
import CargoCard from '../components/cards/CargoCard';import FuelCard from '../components/cards/FuelCard';
import AlertPanel from "../components/alerts/AlertPanel";
import AlertHistory from "../components/alerts/AlertHistory";
import EventLog from "../components/events/EventLog";
import LampPanel from '../components/diagnostics/LampPanel';
import DTCTable from '../components/diagnostics/DTCTable';
import ReplayControls from '../components/replay/ReplayControls';
import LiveMap from "../components/map/LiveMap";
import SimulationControls from "../components/simulation/SimulationControls";
import SimulationEvents from "../components/simulation/SimulationEvents";

const Dashboard = ({ data, loading, error }) => {

  console.log("DIGITAL TWIN:", data);
  
  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full">
        <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-red-500 tracking-wider">BACKEND OFFLINE</h2>
        <p className="text-gray-400 mt-4 text-center max-w-md">
          Unable to establish connection to the vehicle telemetry API. Please check if the backend server is running on port 3000.
        </p>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-dark-700 border-t-brand-blue rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-400 font-medium">Connecting to vehicle systems...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-6 max-w-7xl mx-auto w-full">
      {/* First Row: Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2">
              <LiveMap data={data} />
          </div>
         
          <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
              <SimulationControls />
              <SimulationEvents />

              <h2 className="text-xl font-semibold mb-4">
                  Delivery Overview
              </h2>

              <div className="space-y-3">

                  <div>
                      <span className="text-gray-400">Origin</span>
                      <p>
                          {data.delivery?.route?.origin?.name || "Gangtok"}
                      </p>
                  </div>

                  <div>
                      <span className="text-gray-400">Destination</span>
                      <p>
                          {data.delivery?.route?.destination?.name || "Namchi"}
                      </p>
                  </div>

                  <div>
                      <span className="text-gray-400">ETA</span>
                      <p>
                          {data.delivery?.schedule?.etaMinutes != null
                              ? `${data.delivery.schedule.etaMinutes} Minutes`
                              : "Calculating..."}
                      </p>
                  </div>

                  <div>
                      <span className="text-gray-400">Status</span>
                      <p className="text-green-400">
                          {data.delivery?.status || "In Transit"}
                      </p>
                  </div>

              </div>

          </div>

      </div>

      {/* Second Row: Data Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <EngineCard data={data.vehicle.engine} />
        <MotionCard data={data.vehicle.motion} />
        <CoolingCard data={data.refrigeration} />
        <FuelCard data={data.vehicle.fuel} />
        <CargoCard data={data.cargo} />
      </div>

      {/* Third Row: Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LampPanel diagnostics={data.vehicle.diagnostics} />
        <DTCTable diagnostics={data.vehicle.diagnostics} />
      </div>
      
      {/* Cold Chain Alerts */}
      <AlertPanel alerts={data.alerts} />
      <AlertHistory history={data.alertHistory} />
      <EventLog events={data.events} />
      
      {/* Bottom: Replay Controls */}
      <div className="mt-8">
        <ReplayControls />
      </div>
    </div>
  );
};

export default Dashboard;
