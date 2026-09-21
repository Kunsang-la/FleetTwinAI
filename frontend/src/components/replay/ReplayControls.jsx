import React from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaStop } from 'react-icons/fa';

const ReplayControls = () => {
  return (
    <div className="card flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center space-x-4">
        <h3 className="text-gray-400 font-semibold tracking-wide">REPLAY CONTROLS</h3>
        <span className="bg-blue-900/50 text-brand-blue text-xs px-2 py-1 rounded-md border border-brand-blue/30">
          CAN J1939 LOG
        </span>
      </div>
      
      <div className="flex items-center space-x-6 mt-4 md:mt-0">
        <button className="text-gray-400 hover:text-white transition-colors">
          <FaStepBackward size={20} />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <FaStop size={20} />
        </button>
        <button className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center text-white hover:bg-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all">
          <FaPause size={20} />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <FaPlay size={20} />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <FaStepForward size={20} />
        </button>
      </div>

      <div className="w-full md:w-1/3 mt-4 md:mt-0 flex items-center space-x-3">
        <span className="text-xs text-gray-500">00:12:45</span>
        <div className="flex-1 h-2 bg-dark-700 rounded-full overflow-hidden">
          <div className="h-full bg-brand-blue w-1/3 rounded-full"></div>
        </div>
        <span className="text-xs text-gray-500">01:05:00</span>
      </div>
    </div>
  );
};

export default ReplayControls;
