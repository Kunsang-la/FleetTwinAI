import React from 'react';

const Footer = () => {
  return (
    <footer className="h-10 bg-dark-900 border-t border-dark-700 flex items-center justify-center px-6 text-xs text-gray-500 w-full z-50">
      <span>&copy; {new Date().getFullYear()} FleetTwin AI. All rights reserved. System active.</span>
    </footer>
  );
};

export default Footer;
