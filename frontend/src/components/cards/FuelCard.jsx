import React from 'react';

const FuelCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="card">
      <h3 className="card-header">Fuel Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="data-value">{data.level ?? '--'}%</div>
          <div className="data-label">Level</div>
        </div>
        <div>
          <div className="data-value">{data.rate ?? '--'} L/h</div>
          <div className="data-label">Rate</div>
        </div>
        <div className="col-span-2">
          <div className="data-value">{data.economy ?? '--'} km/L</div>
          <div className="data-label">Economy</div>
        </div>
      </div>
    </div>
  );
};

export default FuelCard;
