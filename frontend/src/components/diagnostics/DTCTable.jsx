import React from 'react';

const DTCTable = ({ diagnostics }) => {
  if (!diagnostics) return null;

  const { activeDTCs } = diagnostics;

  return (
    <div className="card h-full">
      <h3 className="card-header">Active Fault Codes (DTCs)</h3>
      
      {(!activeDTCs || activeDTCs.length === 0) ? (
        <div className="flex items-center justify-center h-32">
          <span className="text-green-500 font-medium">No Active Faults</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-dark-700 text-gray-400 text-sm">
                <th className="py-2 px-4">SPN</th>
                <th className="py-2 px-4">FMI</th>
                <th className="py-2 px-4">Occurrence</th>
              </tr>
            </thead>
            <tbody>
              {activeDTCs.map((dtc, index) => (
                <tr key={index} className="border-b border-dark-800 last:border-0 hover:bg-dark-700/50 transition-colors">
                  <td className="py-3 px-4 text-white font-medium">{dtc.spn}</td>
                  <td className="py-3 px-4 text-white">{dtc.fmi}</td>
                  <td className="py-3 px-4 text-white">{dtc.occurrenceCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DTCTable;
