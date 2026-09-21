import React from 'react';

const MotionCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="card">
      <h3 className="card-header">Motion Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="data-value">{Number(data.speed || 0).toFixed(2)} kmph</div>
          <div className="data-label">Speed</div>
        </div>
        <div>
          <div className="data-value">{Number(data.distance || 0).toLocaleString()} km</div>
          <div className="data-label">Distance</div>
        </div>
      </div>
    </div>
  );
};

export default MotionCard;
