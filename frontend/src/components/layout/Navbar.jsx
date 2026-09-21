import React, { useState, useEffect } from 'react';
import ReplayStatus from '../replay/ReplayStatus';
import { FaTruck, FaWifi } from 'react-icons/fa';

const Navbar = ({ connected }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="h-16 bg-dark-900 border-b border-dark-700 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <FaTruck className="text-brand-blue text-2xl" />
        <h1 className="text-xl font-bold text-white tracking-widest">FleetTwin <span className="text-brand-blue">AI</span></h1>
      </div>
      
      <div className="flex items-center space-x-6">
        <ReplayStatus />
        
        <div className="h-6 w-px bg-dark-700"></div>
        
        <div className="flex items-center space-x-2">
          <div className={`relative flex items-center justify-center w-6 h-6 rounded-full ${connected ? 'bg-brand-green/20' : 'bg-brand-red/20'}`}>
            <FaWifi className={connected ? 'text-brand-green' : 'text-brand-red'} size={12} />
            {connected && (
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-brand-green"></span>
            )}
          </div>
          <span className={`text-sm font-semibold ${connected ? 'text-brand-green' : 'text-brand-red'}`}>
            {connected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        
        <div className="h-6 w-px bg-dark-700"></div>
        
        <div className="text-gray-300 font-mono text-sm">
          {time.toLocaleTimeString()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
