import React, { useState, useEffect } from 'react';
import { Target } from 'lucide-react';
import { sortedPrograms } from '../../api';

const OpportunitiesTab: React.FC = () => {
  const [hoveredProgram, setHoveredProgram] = useState<number | null>(null);
  const [animatedTotal, setAnimatedTotal] = useState(0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate base total (without hovered program) - using a lower multiplier for demonstration
  const baseTotal = sortedPrograms.reduce((sum, p) => sum + p.nextTierBonus * 0.6, 0);
  
  // Calculate total with hovered program's full bonus
  const totalWithHover = hoveredProgram 
    ? baseTotal - (sortedPrograms.find(p => p.id === hoveredProgram)?.nextTierBonus || 0) * 0.6 + (sortedPrograms.find(p => p.id === hoveredProgram)?.nextTierBonus || 0)
    : baseTotal;

  // Animation effect - count up on hover, fade back on mouse out
  useEffect(() => {
    const duration = hoveredProgram ? 500 : 200; // Longer for count-up, shorter for fade
    const startValue = animatedTotal;
    const endValue = totalWithHover;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      let currentValue;
      if (hoveredProgram) {
        // Count-up animation with easing for mouse enter
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        currentValue = startValue + (endValue - startValue) * easeOutQuart;
      } else {
        // Simple linear fade for mouse leave
        currentValue = startValue + (endValue - startValue) * progress;
      }
      
      setAnimatedTotal(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [totalWithHover, hoveredProgram]);

  return (
    <div className="space-y-6">
      {/* Top Message */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
        <p className="text-blue-800">
          Opportunities sorted by impact on quality score and earnings. Higher weight = greater impact on reaching the minimum score of 1.0.
        </p>
      </div>

      {/* Opportunity Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedPrograms.map((program) => (
          <div
            key={program.id}
            className={`bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow flex flex-col ${
              program.weight >= 3 ? 'border-gray-300 border-2' : 'border-gray-200'
            }`}
          >
            {/* High Impact Badge */}
            {program.weight >= 3 && (
              <div className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 text-center">
                HIGH IMPACT
              </div>
            )}

            {/* Opportunity Icon */}
            <div className="flex justify-center pt-6">
              <Target className="w-8 h-8 text-gray-400" />
            </div>

            {/* Card Body */}
            <div className="p-6 text-center flex flex-col flex-grow">
              <h3 className="font-bold text-gray-900 text-xl mb-3">
                {program.name}
              </h3>
              <div className="text-4xl font-bold text-gray-700 mb-4">
                {program.targetTier - program.currentPatients}
              </div>

              {/* Weight and Impact Indicators */}
              <div className="flex justify-center space-x-3 mb-4">
                <div className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
                  Weight: {program.weight}
                </div>
                <div className="bg-gray-50 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
                  +{(program.qualityImpact * 100).toFixed(0)}% Quality
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-6 leading-relaxed flex-grow">
                {program.targetTier - program.currentPatients} more
                members to reach tier {program.currentTier + 1}.<br />
                Earns you {formatCurrency(program.nextTierBonus)}
              </div>

              {/* Action Button */}
              <button 
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-md transition-colors flex items-center justify-center mt-auto"
                onMouseEnter={() => setHoveredProgram(program.id)}
                onMouseLeave={() => setHoveredProgram(null)}
              >
                Take Action
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Overview Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Performance Overview
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {/* Estimated Annual Payouts */}
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Estimated Annual Payouts
            </h3>
            <div className="space-y-3">
              {sortedPrograms.map((program) => {
                const isHovered = hoveredProgram === program.id;
                const baseAmount = program.nextTierBonus * 0.6;
                const fullAmount = program.nextTierBonus;
                const additionalAmount = fullAmount - baseAmount;
                
                return (
                  <div
                    key={program.id}
                    className={`flex justify-between items-center py-2 px-3 rounded transition-colors duration-200 ${
                      isHovered ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {program.name}
                      </div>
                      <div className={`text-xs transition-colors duration-200 ${
                        isHovered ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {isHovered 
                          ? `Additional: +${formatCurrency(additionalAmount)}` 
                          : `Base: ${formatCurrency(baseAmount)}`
                        }
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-semibold transition-colors duration-200 ${
                        isHovered ? 'text-blue-700' : 'text-gray-900'
                      }`}>
                        {formatCurrency(isHovered ? fullAmount : baseAmount)}
                      </div>
                      <div className={`text-xs transition-opacity duration-200 ${
                        isHovered ? 'opacity-100 text-blue-600' : 'opacity-0'
                      }`}>
                        Total potential
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">
                    Total Estimated
                  </span>
                  <span className="font-bold text-green-600 text-lg">
                    {formatCurrency(animatedTotal)}
                  </span>
                </div>
                {hoveredProgram && (
                  <div className="text-xs text-blue-600 mt-1 text-right">
                    Hovering over: {sortedPrograms.find(p => p.id === hoveredProgram)?.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesTab;
