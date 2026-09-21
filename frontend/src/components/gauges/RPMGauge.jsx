import React from 'react';

const RPMGauge = ({ rpm }) => {
  const maxRpm = 3000;
  const redline = 2500;
  
  // Normalize RPM to 0-100 for gauge filling (270 degrees total)
  const percent = Math.min(Math.max(rpm / maxRpm, 0), 1);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  // We want a 270 degree gauge, which is 0.75 of the circumference
  const gaugeLength = circumference * 0.75;
  const strokeDashoffset = gaugeLength - (percent * gaugeLength);
  
  const isRedline = rpm >= redline;

  return (
    <div className="card flex flex-col items-center justify-center h-full min-h-[250px]">
      <h3 className="card-header w-full text-center">Engine Speed</h3>
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
          {/* Redline Track */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#ef4444"
            strokeWidth="4"
            strokeDasharray={`${(maxRpm - redline) / maxRpm * gaugeLength} ${circumference}`}
            strokeDashoffset={- (redline / maxRpm * gaugeLength)}
            strokeLinecap="round"
            className="transform rotate-135 origin-center opacity-50"
          />
          {/* Foreground Track */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={isRedline ? '#ef4444' : '#3b82f6'}
            strokeWidth="12"
            strokeDasharray={`${gaugeLength} ${circumference}`}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            className="transform rotate-135 origin-center transition-all duration-500 ease-out"
            style={{ strokeDashoffset: circumference - gaugeLength + strokeDashoffset }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${isRedline ? 'text-red-500' : 'text-white'}`}>
            {Math.round(rpm)}
          </span>
          <span className="text-gray-400 text-sm">RPM</span>
        </div>
      </div>
    </div>
  );
};

export default RPMGauge;
