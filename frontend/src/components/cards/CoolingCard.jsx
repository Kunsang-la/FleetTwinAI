import React from 'react';

const CoolingCard = ({ data }) => {
  if (!data) return null;

  const temperature = data.currentTemperature;
  const targetTemperature = data.targetTemperature;

  const healthStatus = data.health?.status ?? '--';
  const compressorRunning = data.compressor?.running;

  return (
    <div className="card">
      <h3 className="card-header">Refrigeration</h3>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <div className="data-value">
            {temperature != null
              ? `${Number(temperature).toFixed(2)}°C`
              : '--'}
          </div>
          <div className="data-label">Temperature</div>
        </div>

        <div>
          <div className="data-value">
            {targetTemperature != null
              ? `${Number(targetTemperature).toFixed(1)}°C`
              : '--'}
          </div>
          <div className="data-label">Target</div>
        </div>

        <div>
          <div className="data-value">
            {healthStatus}
          </div>
          <div className="data-label">Health</div>
        </div>

        <div>
          <div className="data-value">
            {compressorRunning == null
              ? '--'
              : compressorRunning
                ? 'Running'
                : 'Off'}
          </div>
          <div className="data-label">Compressor</div>
        </div>

      </div>
    </div>
  );
};

export default CoolingCard;