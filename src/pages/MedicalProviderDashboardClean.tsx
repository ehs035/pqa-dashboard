import { useState } from "react";
import {
  ChevronDown,
  Calendar,
  Clock,
} from "lucide-react";
import { 
  providers,
  reportTimestamps,
  tabs
} from '../api';
import { 
  OverviewTab, 
  OpportunitiesTab, 
  MissedOpportunitiesTab, 
  PerformanceTab, 
  ProgramsTab 
} from '../components/tabs';

const MedicalProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedProvider, setSelectedProvider] = useState(0);
  const [isProviderDropdownOpen, setIsProviderDropdownOpen] = useState(false);
  const qualityScore = 0.9;
  const providerInfo = providers[selectedProvider];

  const formatShortCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    } else {
      return `$${amount}`;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab setActiveTab={setActiveTab} />;
      case "opportunities":
        return <OpportunitiesTab />;
      case "missed":
        return <MissedOpportunitiesTab />;
      case "performance":
        return <PerformanceTab />;
      case "programs":
        return <ProgramsTab />;
      default:
        return <OverviewTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-6">
          {/* Top Row - Title and Timestamps */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
                Provider Performance Dashboard
              </h1>
              <p className="text-gray-600 text-sm mb-3">
                Track your earning opportunities and program performance
              </p>
              {/* Timestamps */}
              <div className="flex items-center space-x-6 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>Report data as of: <strong className="text-gray-700">{reportTimestamps.dataAsOf}</strong></span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Published <strong className="text-gray-700">{reportTimestamps.published}</strong></span>
                </div>
              </div>
            </div>
            {/* Provider Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProviderDropdownOpen(!isProviderDropdownOpen)}
                className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {providerInfo.avatar}
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-900">
                    {providerInfo.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    ID: {providerInfo.providerId} | Office: {providerInfo.officeLocationId}
                  </div>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isProviderDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isProviderDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {providers.map((provider, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedProvider(index);
                        setIsProviderDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                        index === selectedProvider ? 'bg-blue-50' : ''
                      } ${index === 0 ? 'rounded-t-lg' : ''} ${index === providers.length - 1 ? 'rounded-b-lg' : ''}`}
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {provider.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {provider.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {provider.providerId}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Row - Quality Score and Earnings */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {/* Quality Score */}
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Quality Score</div>
                  <div className={`text-3xl font-bold ${qualityScore < 1.0 ? 'text-red-600' : 'text-green-600'}`}>
                    {qualityScore}
                  </div>
                  <div className="text-xs text-gray-500">Min to earn: 1.0</div>
                </div>
                {/* Circular Gauge */}
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke={qualityScore < 1.0 ? "#ef4444" : "#10b981"}
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 40 * (qualityScore / 4)} ${2 * Math.PI * 40}`}
                      strokeDashoffset="0"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-xs font-bold text-gray-700">
                      {qualityScore}
                    </div>
                  </div>
                </div>
              </div>

              {/* Earnings */}
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Estimated Annual Payment</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatShortCurrency(providerInfo.estimatedAnnualPayment)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Potential Annual Earnings</div>
                  <div className="text-2xl font-bold text-green-600">
                    {formatShortCurrency(providerInfo.potentialAnnualEarnings)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-2 mb-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default MedicalProviderDashboard;
