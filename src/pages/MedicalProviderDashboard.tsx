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
  const providerInfo = providers[selectedProvider];
  const qualityScore = providerInfo.qualityScore;

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
        return <OverviewTab setActiveTab={setActiveTab} selectedProvider={selectedProvider} />;
      case "opportunities":
        return <OpportunitiesTab />;
      case "missed":
        return <MissedOpportunitiesTab />;
      case "performance":
        return <PerformanceTab />;
      case "programs":
        return <ProgramsTab />;
      default:
        return <OverviewTab setActiveTab={setActiveTab} selectedProvider={selectedProvider} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back to Home Button */}
        <div className="mb-4">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </button>
        </div>

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
          {/* Bottom Row - Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Estimated Annual Payment */}
            <div className="text-center bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-600 font-medium mb-1">
                Est. Annual Payment
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {formatShortCurrency(providerInfo.estimatedAnnualPayment)}
              </div>
            </div>
            {/* Potential Annual Earnings */}
            <div className="text-center bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-600 font-medium mb-1">
                Potential Annual
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {formatShortCurrency(providerInfo.potentialAnnualEarnings)}
              </div>
            </div>
            {/* Quality Score */}
            <div className="text-center bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-gray-600 font-medium">
                  Quality Score
                </div>
                <div className="text-xs text-gray-500">
                  Min to earn: 1.0
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className={`text-2xl font-bold ${qualityScore < 1.0 ? 'text-red-600' : 'text-green-600'}`}>
                  {qualityScore}
                </div>
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={qualityScore < 1.0 ? "text-red-600" : "text-green-600"}
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      strokeDasharray={`${qualityScore * 100}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-xs font-bold text-gray-600">
                      {Math.round(qualityScore * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Current Month Earnings */}
            <div className="text-center bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-600 font-medium mb-1">
                Current Month
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {formatShortCurrency(45000)}
              </div>
              <div className="text-xs text-gray-500">
                +7.1% vs last month
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-6">
          <div className="flex border-b border-gray-100">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-semibold transition-all duration-200 flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-3 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
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
