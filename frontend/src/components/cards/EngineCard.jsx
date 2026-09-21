import React from 'react';

const EngineCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="card">
      <h3 className="card-header">Engine Parameters</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="data-value">{data.rpm ?? '--'}</div>
          <div className="data-label">RPM</div>
        </div>
        <div>
          <div className="data-value">{data.acceleratorPosition ?? '--'}%</div>
          <div className="data-label">Accelerator</div>
        </div>
        <div>
          <div className="data-value">{data.engineHours ?? '--'} h</div>
          <div className="data-label">Engine Hours</div>
        </div>
        <div>
          <div className="data-value">{data.torqueMode ?? '--'}</div>
          <div className="data-label">Torque Mode</div>
        </div>
      </div>
    </div>
  );
};

export default EngineCard;
