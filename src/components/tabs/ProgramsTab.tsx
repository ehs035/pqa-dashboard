import React from 'react';
import { performanceHistoryData } from '../../api';

const ProgramsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Performance Comparison
        </h2>
        <div className="h-80">
          <div className="flex items-end justify-between h-full space-x-2">
            {performanceHistoryData.map((data, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 flex-1"
              >
                <div className="flex space-x-1 h-64">
                  <div className="w-4 bg-blue-200 rounded-t flex flex-col justify-end">
                    <div
                      className="bg-blue-600 rounded-t w-full"
                      style={{
                        height: `${(data.previous / 60000) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="w-4 bg-green-200 rounded-t flex flex-col justify-end">
                    <div
                      className="bg-green-600 rounded-t w-full"
                      style={{
                        height: `${(data.current / 60000) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-xs text-gray-600">
                  {data.month}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Previous Year</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-600 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Current Year</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsTab;
