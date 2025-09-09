import React from 'react';
import { Clock, DollarSign, TrendingUp, Target, Users } from 'lucide-react';

import { ResponsiveLine } from '@nivo/line';
import { ResponsiveRadar } from '@nivo/radar';
import GaugeComponent from 'react-gauge-component';
import { 
  regionalData, 
  programs, 
  urgentActions,
  providers
} from '../../api';

interface OverviewTabProps {
  setActiveTab: (tab: string) => void;
  selectedProvider?: number;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ setActiveTab, selectedProvider = 0 }) => {
  // Use actual provider earnings data
  const currentProvider = providers[selectedProvider];
  const totalCurrentEarnings = currentProvider.estimatedAnnualPayment;
  const totalPotentialEarnings = currentProvider.potentialAnnualEarnings;
  const earningsDifference = totalPotentialEarnings - totalCurrentEarnings;



  const qualityDistributionData = [
    {
      id: "Quality Score Distribution",
      data: regionalData.qualityScoreDistribution.map((item) => ({
        x: item.score,
        y: item.providers,
      })),
    },
  ];

  const programRadarData = programs.map((program) => ({
    program: program.name,
    currentTier: program.currentTier,
    maxTier: 3,
    weight: program.weight,
    qualityImpact: program.qualityImpact * 100,
  }));

  const currentEarnings = {
    currentMonth: 45000,
    previousMonth: 42000,
    yearToDate: 520000,
    target: 600000,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-red-200 bg-red-50";
      case "high":
        return "border-orange-200 bg-orange-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getPriorityTextColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-700";
      case "high":
        return "text-orange-700";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* Time Sensitive Actions - Above everything else */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Time Sensitive Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {urgentActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <div
                key={action.id}
                className={`border rounded-xl p-6 hover:shadow-md transition-all duration-200 ${getPriorityColor(action.priority)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`h-6 w-6 ${getPriorityTextColor(action.priority)}`} />
                    <h3 className="font-bold text-gray-900 text-lg">
                      {action.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {action.description}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Due: {action.deadline}
                    </span>
                    <span className="text-xs text-gray-500">
                      {action.patients} patients
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className={`text-sm font-medium ${getPriorityTextColor(action.priority)}`}>
                        {action.daysLeft} days left
                      </span>
                    </div>
                  </div>
                  <button className={`w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    action.priority === "urgent"
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : action.priority === "high"
                      ? "bg-orange-600 hover:bg-orange-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}>
                    {action.action}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Horizontal Layout for Payouts and Regional Performance */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Estimated Annual Payouts */}
          <div className="w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Estimated Annual Payouts
            </h2>
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estimated Annual Payment</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalCurrentEarnings)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Potential Annual Earnings</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalPotentialEarnings)}
                  </span>
                </div>
                <div className="text-center py-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">See ways to claim the difference of</span>
                  <span className="text-3xl font-bold text-gray-900 block mt-2">
                    {formatCurrency(earningsDifference)}
                  </span>
                </div>
              </div>
              {/* Progress Gauge */}
              <div className="flex justify-center items-center h-full">
                <div className="w-[600px] h-[328px] relative">
                  <GaugeComponent
                    type="semicircle"
                    arc={{
                      colorArray: ['#FF2121','#00FF15'],
                      padding: 0.02,
                      subArcs: [
                        { limit: 40 },
                        { limit: 60 },
                        { limit: 70 },
                        {},
                        {},
                        {},
                        {}
                      ]
                    }}
                    pointer={{ type: "blob", animationDelay: 0 }}
                    value={Math.round((totalCurrentEarnings / totalPotentialEarnings) * 100)}
                    labels={{
                      valueLabel: {
                        style: {
                          fontSize: "35px",
                          fill: "#000"
                        }
                      }
                    }}
                  />
                  {/* Custom center content 
                  /*<div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold text-gray-900">
                      {formatCurrency(earningsDifference)}
                    </div>
                  </div>*/}
                </div>
              </div>
              {/* Call to Action */}
              <div 
                className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 cursor-pointer hover:from-blue-100 hover:to-blue-200 transition-all duration-200 mt-8"
                onClick={() => setActiveTab("opportunities")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">
                      Ready to increase your earnings?
                    </h3>
                    <p className="text-sm text-blue-700">
                      View opportunities to reach your full earning potential
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600">
                    <span className="text-sm font-medium">View Opportunities</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Quality Performance */}
          <div className="w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Regional Quality Performance
            </h2>
            <div className="text-sm text-gray-600 mb-4">
              Performance comparison within your assigned region
            </div>
            <div className="space-y-6">
              {/* Context Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Assigned Region:</span>
                  <span className="font-semibold text-gray-900 ml-2">{regionalData.region}</span>
                </div>
                <div>
                  <span className="text-gray-500">Specialty:</span>
                  <span className="font-semibold text-gray-900 ml-2">{regionalData.specialty}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">Peer Providers in Region:</span>
                  <span className="font-semibold text-gray-900 ml-2">{regionalData.totalPeerProviders}</span>
                </div>
              </div>
              {/* Quality Score Distribution Chart */}
              <div className="space-y-4">
                <div className="text-sm font-semibold text-gray-700">Quality Score Distribution in {regionalData.region}</div>
                <div className="h-64">
                  <ResponsiveLine
                    data={qualityDistributionData}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: "linear", min: 0, max: 4 }}
                    yScale={{
                      type: "linear",
                      min: 0,
                      max: "auto",
                      stacked: false,
                      reverse: false,
                    }}
                    curve="cardinal"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "Quality Score",
                      legendPosition: "middle",
                      legendOffset: 36,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "Number of Providers",
                      legendPosition: "middle",
                      legendOffset: -40,
                    }}
                    colors={{ scheme: "category10" }}
                    lineWidth={3}
                    pointSize={8}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    markers={[
                      {
                        axis: "x",
                        value: regionalData.currentProviderQualityScore,
                        lineStyle: { stroke: "#e74c3c", strokeWidth: 3, strokeDasharray: "5 5" },
                        textStyle: { fill: "#e74c3c", fontSize: 12, fontWeight: "bold" },
                        legend: "Your Score",
                        legendPosition: "top-left",
                      },
                      {
                        axis: "x",
                        value: regionalData.medianQualityScore,
                        lineStyle: { stroke: "#27ae60", strokeWidth: 3, strokeDasharray: "5 5" },
                        textStyle: { fill: "#27ae60", fontSize: 12, fontWeight: "bold" },
                        legend: "Median",
                        legendPosition: "top-left",
                      },
                      {
                        axis: "x",
                        value: regionalData.maxQualityScore,
                        lineStyle: { stroke: "#f39c12", strokeWidth: 3, strokeDasharray: "5 5" },
                        textStyle: { fill: "#f39c12", fontSize: 12, fontWeight: "bold" },
                        legend: "Max Score",
                        legendPosition: "top-left",
                      },
                    ]}
                    legends={[
                      {
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: "left-to-right",
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: "circle",
                        symbolBorderColor: "rgba(0, 0, 0, .5)",
                        effects: [
                          {
                            on: "hover",
                            style: {
                              itemBackground: "rgba(0, 0, 0, .03)",
                              itemOpacity: 1,
                            },
                          },
                        ],
                      },
                    ]}
                    animate={true}
                    role="application"
                    ariaLabel="Quality score distribution line chart"
                  />
                </div>
              </div>
              {/* Performance Indicators */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600 font-semibold">Your Score: {regionalData.currentProviderQualityScore}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Regional Median: {regionalData.medianQualityScore}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">Regional Max: {regionalData.maxQualityScore}</span>
                </div>
              </div>
              {/* Motivational Message */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <p className="text-blue-800 text-sm">
                  You're currently below the median in {regionalData.region}. Focus on high-impact programs to improve your quality score and earnings!
                </p>
              </div>
              {/* Call to Action */}
              <div 
                className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-4 cursor-pointer hover:from-green-100 hover:to-green-200 transition-all duration-200"
                onClick={() => setActiveTab("performance")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-green-900 mb-1">
                      Improve your quality score?
                    </h3>
                    <p className="text-sm text-green-700">
                      View detailed performance metrics and improvement strategies
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-green-600">
                    <span className="text-sm font-medium">View Performance</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Performance Radar Chart */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Program Performance Overview
        </h2>
        <div className="h-96">
          <ResponsiveRadar
            data={programRadarData}
            keys={["currentTier", "maxTier", "weight", "qualityImpact"]}
            indexBy="program"
            valueFormat=">-.2f"
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            borderColor={{ from: "color" }}
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: "background" }}
            dotBorderWidth={2}
            colors={{ scheme: "nivo" }}
            blendMode="multiply"
            motionConfig="wobbly"
            legends={[
              {
                anchor: "top-left",
                direction: "column",
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: "#999",
                symbolSize: 12,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
          />
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>
            This radar chart shows your current performance across all programs. Focus on areas where you're below the maximum to increase your earnings and quality score.
          </p>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Year to Date</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {formatCurrency(currentEarnings.yearToDate)}
              </p>
            </div>
            <DollarSign className="h-10 w-10 text-green-500" />
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm">
              <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-green-600 font-medium">
                {(
                  (currentEarnings.yearToDate / currentEarnings.target) *
                  100
                ).toFixed(1)}
                % of target
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Active Programs
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {programs.length}
              </p>
            </div>
            <Target className="h-10 w-10 text-blue-500" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-600 font-medium">
              {programs.filter((p) => p.status === "on-track").length} on
              track
            </span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Patients</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {programs.reduce(
                  (sum, p) => sum + p.currentPatients,
                  0
                )}
              </p>
            </div>
            <Users className="h-10 w-10 text-purple-500" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-600 font-medium">
              Across all programs
            </span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Potential Earnings
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {formatCurrency(
                  programs.reduce((sum, p) => sum + p.nextTierBonus, 0)
                )}
              </p>
            </div>
            <TrendingUp className="h-10 w-10 text-orange-500" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-600 font-medium">
              Next tier bonuses
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;