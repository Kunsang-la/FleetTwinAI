import React from 'react';

const CargoCard = ({ data }) => {
  if (!data) return null;

  const temperature = data.temperature?.current;
  const humidity = data.humidity?.current;
  const quality = data.quality?.status;
  const risk = data.status?.riskLevel;
  const qualityClass = {
  GOOD: 'text-green-400',
  AT_RISK: 'text-yellow-400',
  COMPROMISED: 'text-orange-400',
  SPOILED: 'text-red-500'
};

const riskClass = {
  LOW: 'text-green-400',
  HIGH: 'text-yellow-400',
  CRITICAL: 'text-red-500'
};

  return (
    <div className="card">
      <h3 className="card-header">Cargo Status</h3>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <div className="data-value">
            {data.type ?? '--'}
          </div>
          <div className="data-label">Cargo Type</div>
        </div>

        <div>
          <div className="data-value">
            {data.quantity?.value ?? '--'}
          </div>
          <div className="data-label">
            {data.quantity?.unit ?? 'Quantity'}
          </div>
        </div>

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
            {humidity != null
              ? `${Number(humidity).toFixed(0)}%`
              : '--'}
          </div>
          <div className="data-label">Humidity</div>
        </div>

        <div>
          <div
            className={`data-value ${
              qualityClass[quality] ?? 'text-gray-300'
            }`}
          >
            {quality ?? '--'}
          </div>
          <div className="data-label">Quality</div>
        </div>

        <div>
          <div
            className={`data-value ${
              riskClass[risk] ?? 'text-gray-300'
            }`}
          >
            {risk ?? '--'}
          </div>
          <div className="data-label">Risk</div>
        </div>

      </div>
    </div>
  );
};

export default CargoCard;