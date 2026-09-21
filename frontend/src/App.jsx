import React from 'react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import useDigitalTwin from "./hooks/useDigitalTwin";

function App() {
  const { data, loading, error, connected } = useDigitalTwin();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-dark-900 font-sans text-gray-100">
      <Navbar connected={connected} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 flex flex-col relative w-full sm:ml-16 md:ml-64 transition-all duration-300 overflow-hidden">
          <Dashboard data={data} loading={loading} error={error} />
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
