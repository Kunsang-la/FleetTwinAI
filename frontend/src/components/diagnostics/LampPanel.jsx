import React from 'react';

const LampPanel = ({ diagnostics }) => {
  if (!diagnostics) return null;

  const lamps = [
    { label: 'MIL', active: diagnostics.mil, color: 'bg-yellow-500', shadow: 'shadow-yellow-500/50' },
    { label: 'Amber Warning', active: diagnostics.amberWarning, color: 'bg-orange-500', shadow: 'shadow-orange-500/50' },
    { label: 'Red Stop', active: diagnostics.redStop, color: 'bg-red-600', shadow: 'shadow-red-600/50' },
    { label: 'Protect Lamp', active: diagnostics.protectLamp, color: 'bg-blue-500', shadow: 'shadow-blue-500/50' },
  ];

  return (
    <div className="card">
      <h3 className="card-header">Warning Lamps</h3>
      <div className="flex justify-around items-center h-24">
        {lamps.map((lamp, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full border-2 border-dark-900 transition-all duration-300 ${
                lamp.active
                  ? `${lamp.color} shadow-[0_0_15px_rgba(0,0,0,0.5)] ${lamp.shadow}`
                  : 'bg-gray-700'
              }`}
            ></div>
            <span className="text-xs text-gray-400 mt-2 font-semibold tracking-wide text-center w-20">
              {lamp.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LampPanel;
