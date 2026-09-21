import React from 'react';

const ReplayStatus = () => {
  return (
    <div className="flex items-center space-x-2 bg-dark-800 px-3 py-1.5 rounded-lg border border-dark-700">
      <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></div>
      <span className="text-xs font-medium text-gray-300">Replaying...</span>
    </div>
  );
};

export default ReplayStatus;
