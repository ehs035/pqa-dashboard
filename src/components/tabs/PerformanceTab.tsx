import React from 'react';
import { Target, Users, TrendingUp, DollarSign } from 'lucide-react';
import { programs } from '../../api';

const PerformanceTab: React.FC = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "bg-green-100 text-green-800";
      case "at-risk":
        return "bg-yellow-100 text-yellow-800";
      case "behind":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Quality Programs Overview
        </h2>
        
        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs
            .sort((a, b) => b.weight - a.weight) // Sort by weight descending (highest first)
            .map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {program.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {program.category}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                  {program.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>

              <div className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{program.progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${program.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Current</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {program.currentPatients.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                      <Target className="h-4 w-4" />
                      <span className="text-sm">Target</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {program.targetTier.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Tier and Earnings */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Tier</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {program.currentTier}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Next Tier Bonus</span>
                    <span className="text-lg font-semibold text-green-600">
                      {formatCurrency(program.nextTierBonus)}
                    </span>
                  </div>
                </div>

                {/* Weight and Impact */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      Weight: {program.weight}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      Impact: {(program.qualityImpact * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-gray-600 mb-2">
              <Target className="h-5 w-5" />
              <span className="text-sm font-medium">Total Programs</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {programs.length}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-gray-600 mb-2">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">Total Patients</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {programs.reduce((sum, p) => sum + p.currentPatients, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-gray-600 mb-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">On Track</span>
            </div>
            <div className="text-3xl font-bold text-green-600">
              {programs.filter(p => p.status === "on-track").length}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-gray-600 mb-2">
              <DollarSign className="h-5 w-5" />
              <span className="text-sm font-medium">Total Potential</span>
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {formatCurrency(programs.reduce((sum, p) => sum + p.nextTierBonus, 0))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTab;
