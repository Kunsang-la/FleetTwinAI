import React from 'react';
import { FaTachometerAlt, FaHistory, FaCog, FaChartLine } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-16 md:w-64 bg-dark-900 border-r border-dark-700 hidden sm:flex flex-col h-[calc(100vh-4rem)] fixed left-0 top-16">
      <nav className="flex-1 py-6 flex flex-col space-y-2">
        <a href="#" className="flex items-center px-4 md:px-6 py-3 text-brand-blue bg-dark-800 border-r-4 border-brand-blue transition-colors">
          <FaTachometerAlt size={20} />
          <span className="ml-4 font-medium hidden md:block">Dashboard</span>
        </a>
        <a href="#" className="flex items-center px-4 md:px-6 py-3 text-gray-400 hover:text-white hover:bg-dark-800 transition-colors">
          <FaChartLine size={20} />
          <span className="ml-4 font-medium hidden md:block">Analytics</span>
        </a>
        <a href="#" className="flex items-center px-4 md:px-6 py-3 text-gray-400 hover:text-white hover:bg-dark-800 transition-colors">
          <FaHistory size={20} />
          <span className="ml-4 font-medium hidden md:block">Logs & Replay</span>
        </a>
      </nav>
      
      <div className="p-4 md:p-6">
        <a href="#" className="flex items-center text-gray-400 hover:text-white transition-colors">
          <FaCog size={20} />
          <span className="ml-4 font-medium hidden md:block">Settings</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
