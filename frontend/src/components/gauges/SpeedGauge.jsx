import React from 'react';

const SpeedGauge = ({ speed }) => {
  const maxSpeed = 160; // max km/h
  
  // Normalize speed to 0-100 for gauge filling (270 degrees total)
  const percent = Math.min(Math.max(speed / maxSpeed, 0), 1);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const gaugeLength = circumference * 0.75;
  const strokeDashoffset = gaugeLength - (percent * gaugeLength);

  return (
    <div className="card flex flex-col items-center justify-center h-full min-h-[250px]">
      <h3 className="card-header w-full text-center">Vehicle Speed</h3>
      <div className="relative w-40 h-40">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 140 140"
        >
          {/* Background Track */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#374151"
            strokeWidth="12"
            strokeDasharray={`${gaugeLength} ${circumference}`}
            strokeLinecap="round"
            className="transform rotate-135 origin-center"
          />
          {/* Foreground Track */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#f97316"
            strokeWidth="12"
            strokeDasharray={`${gaugeLength} ${circumference}`}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            className="transform rotate-135 origin-center transition-all duration-500 ease-out"
            style={{ strokeDashoffset: circumference - gaugeLength + strokeDashoffset }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">
            {Number(speed || 0).toFixed(1)}
          </span>
          <span className="text-gray-400 text-sm">kmph</span>
        </div>
      </div>
    </div>
  );
};

export default SpeedGauge;
