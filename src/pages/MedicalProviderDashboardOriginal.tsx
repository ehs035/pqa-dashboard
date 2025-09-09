import { useState } from "react";
import {
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Clock,
  ChevronDown,
  ChevronRight,
  Mail,
  User,
  Calendar,
} from "lucide-react";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveRadar } from "@nivo/radar";
import { 
  regionalData, 
  programs, 
  sortedPrograms,
  urgentActions, 
  missedOpportunities,
  providers,
  reportTimestamps,
  tabs,
  performanceHistoryData
} from '../api';
const MedicalProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedTables, setExpandedTables] = useState<Set<number>>(new Set());
  const [selectedProvider, setSelectedProvider] = useState(0);
  const [isProviderDropdownOpen, setIsProviderDropdownOpen] = useState(false);
  const currentEarnings = {
    currentMonth: 45000,
    previousMonth: 42000,
    yearToDate: 520000,
    target: 600000,
  };
  const qualityScore = 0.9;

  const providerInfo = providers[selectedProvider];


  // Calculate total earnings across all programs
  const totalCurrentEarnings = programs.reduce((sum, program) => {
    const tierEarnings = program.currentTier * 10000; // $10k per tier
    return sum + tierEarnings;
  }, 0);
  
  const totalPotentialEarnings = programs.length * 3 * 10000; // 3 tiers max, $10k per tier
  
  const earningsDifference = totalPotentialEarnings - totalCurrentEarnings;

  // Nivo chart data
  const earningsPieData = [
    {
      id: "Current Earnings",
      label: "Current Earnings",
      value: totalCurrentEarnings,
      color: "hsl(220, 70%, 50%)",
    },
    {
      id: "Potential Additional",
      label: "Potential Additional",
      value: earningsDifference,
      color: "hsl(220, 70%, 30%)",
    },
  ];

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


  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatShortCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    } else {
      return `$${amount}`;
    }
  };

  const toggleTableExpansion = (index: number) => {
    const newExpanded = new Set(expandedTables);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedTables(newExpanded);
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {" "}
      <div className="max-w-7xl mx-auto">
        {" "}
        {/* Header */}{" "}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-6">
          {" "}
          {/* Top Row - Title and Timestamps */}
          <div className="flex items-start justify-between mb-4">
            {" "}
            <div>
              {" "}
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
                Provider Performance Dashboard
              </h1>{" "}
              <p className="text-gray-600 text-sm mb-3">
                Track your earning opportunities and program performance
              </p>{" "}
              {/* Timestamps */}
              <div className="flex items-center space-x-6 text-xs text-gray-500">
                {" "}
                <div className="flex items-center space-x-1">
                  {" "}
                  <Calendar className="h-3 w-3" />{" "}
                  <span>Report data as of: <strong className="text-gray-700">{reportTimestamps.dataAsOf}</strong></span>{" "}
            </div>{" "}
                <div className="flex items-center space-x-1">
              {" "}
                  <Clock className="h-3 w-3" />{" "}
                  <span>Published <strong className="text-gray-700">{reportTimestamps.published}</strong></span>{" "}
              </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* Provider Dropdown */}
            <div className="relative">
              {" "}
              <button
                onClick={() => setIsProviderDropdownOpen(!isProviderDropdownOpen)}
                className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                {" "}
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {providerInfo.avatar}
                </div>{" "}
                <div className="text-left">
                  {" "}
                  <div className="text-sm font-semibold text-gray-900">
                    {providerInfo.name}
                  </div>{" "}
                  <div className="text-xs text-gray-500">
                    ID: {providerInfo.providerId} | Office: {providerInfo.officeLocationId}
                  </div>{" "}
                </div>{" "}
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isProviderDropdownOpen ? 'rotate-180' : ''}`} />{" "}
              </button>{" "}
              {isProviderDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {" "}
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
                      {" "}
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {provider.avatar}
                      </div>{" "}
                      <div>
                        {" "}
                        <div className="text-sm font-semibold text-gray-900">
                          {provider.name}
                        </div>{" "}
                        <div className="text-xs text-gray-500">
                          ID: {provider.providerId} | Office: {provider.officeLocationId}
                        </div>{" "}
                      </div>{" "}
                    </button>
                  ))}{" "}
                </div>
              )}{" "}
            </div>{" "}
          </div>{" "}
          {/* Bottom Row - Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {" "}
            {/* Estimated Annual Payment */}
            <div className="text-center bg-gray-50 rounded-lg p-3">
              {" "}
              <div className="text-xs text-gray-600 font-medium mb-1">
                Est. Annual Payment
              </div>{" "}
              <div className="text-2xl font-bold text-gray-800">
                {formatShortCurrency(providerInfo.estimatedAnnualPayment)}
              </div>{" "}
            </div>{" "}
            {/* Potential Annual Earnings */}
            <div className="text-center bg-gray-50 rounded-lg p-3">
              {" "}
              <div className="text-xs text-gray-600 font-medium mb-1">
                Potential Annual
              </div>{" "}
              <div className="text-2xl font-bold text-gray-800">
                {formatShortCurrency(providerInfo.potentialAnnualEarnings)}
              </div>{" "}
            </div>{" "}
            {/* Quality Score */}
            <div className="text-center bg-gray-50 rounded-lg p-3">
              {" "}
              <div className="flex items-center justify-between mb-2">
                {" "}
                <div className="text-xs text-gray-600 font-medium">
                  Quality Score
                </div>{" "}
                <div className="text-xs text-gray-500">
                  Min to earn: 1.0
                </div>{" "}
              </div>{" "}
              <div className="flex items-center justify-center space-x-3">
                {" "}
                <div className="text-2xl font-bold text-gray-800">
                  {qualityScore}
                </div>{" "}
                <div className="relative w-12 h-12">
                  {" "}
                  <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                    {" "}
                    <path
                      className="text-gray-200"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />{" "}
                    <path
                      className="text-gray-600"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      strokeDasharray={`${qualityScore * 100}, 100`}
                    />{" "}
                  </svg>{" "}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {" "}
                    <div className="text-xs font-bold text-gray-600">
                      {Math.round(qualityScore * 100)}%
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* Current Month Earnings */}
            <div className="text-center bg-gray-50 rounded-lg p-3">
              {" "}
              <div className="text-xs text-gray-600 font-medium mb-1">
                Current Month
              </div>{" "}
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {formatCurrency(currentEarnings.currentMonth)}
              </div>{" "}
              <div className="text-xs text-gray-500">
                {" "}
                +{(
                  ((currentEarnings.currentMonth -
                    currentEarnings.previousMonth) /
                    currentEarnings.previousMonth) *
                  100
                ).toFixed(1)}
                % vs last month{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Navigation Tabs */}{" "}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-6">
          {" "}
          <div className="flex border-b border-gray-100">
            {" "}
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
            })}{" "}
          </div>{" "}
        </div>{" "}
        {/* Overview Tab */}{" "}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {" "}
            {/* Program Progress and Regional Comparison */}{" "}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {" "}
              {/* Estimated Annual Payouts */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                {" "}
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Estimated Annual Payouts
                </h2>{" "}
          <div className="space-y-6">
            {" "}
                  {/* Key Metrics */}
                  <div className="space-y-4">
                    {" "}
                    <div className="flex justify-between items-center">
                      {" "}
                      <span className="text-gray-600">Estimated Annual Payment</span>{" "}
                      <span className="text-2xl font-bold text-gray-900">
                        {formatCurrency(totalCurrentEarnings)}
                      </span>{" "}
                    </div>{" "}
                    <div className="flex justify-between items-center">
                      {" "}
                      <span className="text-gray-600">Potential Annual Earnings</span>{" "}
                      <span className="text-2xl font-bold text-gray-900">
                        {formatCurrency(totalPotentialEarnings)}
                      </span>{" "}
                    </div>{" "}
                    <div className="text-center py-4 bg-gray-50 rounded-lg">
                      {" "}
                      <span className="text-gray-600">See ways to claim the difference of</span>{" "}
                      <span className="text-3xl font-bold text-gray-900 block mt-2">
                        {formatCurrency(earningsDifference)}
                      </span>{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Visual Progress Chart */}
                  <div className="h-64">
                    {" "}
                    <ResponsivePie
                      data={earningsPieData}
                      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                      innerRadius={0.5}
                      padAngle={0.7}
                      cornerRadius={3}
                      activeOuterRadiusOffset={8}
                      borderWidth={1}
                      borderColor={{
                        from: "color",
                        modifiers: [["darker", 0.2]],
                      }}
                      arcLinkLabelsSkipAngle={10}
                      arcLinkLabelsTextColor="#333333"
                      arcLinkLabelsThickness={2}
                      arcLinkLabelsColor={{ from: "color" }}
                      arcLabelsSkipAngle={10}
                      arcLabelsTextColor={{
                        from: "color",
                        modifiers: [["darker", 2]],
                      }}
                      defs={[
                        {
                          id: "dots",
                          type: "patternDots",
                          background: "inherit",
                          color: "rgba(255, 255, 255, 0.3)",
                          size: 4,
                          padding: 1,
                          stagger: true,
                        },
                        {
                          id: "lines",
                          type: "patternLines",
                          background: "inherit",
                          color: "rgba(255, 255, 255, 0.3)",
                          rotation: -45,
                          lineWidth: 6,
                          spacing: 10,
                        },
                      ]}
                      fill={[
                        {
                          match: {
                            id: "Current Earnings",
                          },
                          id: "dots",
                        },
                        {
                          match: {
                            id: "Potential Additional",
                          },
                          id: "lines",
                        },
                      ]}
                      legends={[
                        {
                          anchor: "bottom",
                          direction: "row",
                          justify: false,
                          translateX: 0,
                          translateY: 56,
                          itemsSpacing: 0,
                          itemWidth: 100,
                          itemHeight: 18,
                          itemTextColor: "#999",
                          itemDirection: "left-to-right",
                          itemOpacity: 1,
                          symbolSize: 18,
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
                    />{" "}
                  </div>{" "}
                  {/* Call to Action */}
                  <div 
                    className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 cursor-pointer hover:from-blue-100 hover:to-blue-200 transition-all duration-200"
                    onClick={() => setActiveTab("opportunities")}
                  >
                    {" "}
                    <div className="flex items-center justify-between">
                      {" "}
                      <div>
                        {" "}
                        <h3 className="text-lg font-semibold text-blue-900 mb-1">
                          Ready to increase your earnings?
                        </h3>{" "}
                        <p className="text-sm text-blue-700">
                          View opportunities to reach your full earning potential
                        </p>{" "}
                      </div>{" "}
                      <div className="flex items-center space-x-2 text-blue-600">
                        {" "}
                        <span className="text-sm font-medium">View Opportunities</span>{" "}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {" "}
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />{" "}
                        </svg>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              {/* Regional Quality Performance */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                {" "}
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Regional Quality Performance
                </h2>{" "}
                <div className="text-sm text-gray-600 mb-4">
                  Performance comparison within your assigned region
                </div>{" "}
                <div className="space-y-6">
                  {" "}
                  {/* Context Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {" "}
                    <div>
                      {" "}
                      <span className="text-gray-500">Assigned Region:</span>{" "}
                      <span className="font-semibold text-gray-900">{regionalData.region}</span>{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <span className="text-gray-500">Specialty:</span>{" "}
                      <span className="font-semibold text-gray-900">{regionalData.specialty}</span>{" "}
                    </div>{" "}
                    <div className="col-span-2">
                      {" "}
                      <span className="text-gray-500">Peer Providers in Region:</span>{" "}
                      <span className="font-semibold text-gray-900">{regionalData.totalPeerProviders}</span>{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Quality Score Distribution Chart */}
                  <div className="space-y-4">
                    {" "}
                    <div className="text-sm font-semibold text-gray-700">Quality Score Distribution in {regionalData.region}</div>{" "}
                    <div className="h-64">
                      {" "}
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
                      />{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Performance Indicators */}
                  <div className="space-y-3">
                    {" "}
                    <div className="flex items-center justify-between">
                      {" "}
                      <div className="flex items-center space-x-2">
                        {" "}
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>{" "}
                        <span className="text-sm text-gray-600 font-semibold">Your Score: {regionalData.currentProviderQualityScore}</span>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="flex items-center justify-between">
                      {" "}
                      <div className="flex items-center space-x-2">
                        {" "}
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>{" "}
                        <span className="text-sm text-gray-600">Regional Median: {regionalData.medianQualityScore}</span>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="flex items-center justify-between">
                      {" "}
                      <div className="flex items-center space-x-2">
                        {" "}
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>{" "}
                        <span className="text-sm text-gray-600">Regional Max: {regionalData.maxQualityScore}</span>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Motivational Message */}
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    {" "}
                    <p className="text-blue-800 text-sm">
                      {" "}
                      You're currently below the median in {regionalData.region}. Focus on high-impact programs to improve your quality score and earnings!{" "}
                    </p>{" "}
                  </div>{" "}
                  {/* Call to Action */}
                  <div 
                    className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-4 cursor-pointer hover:from-green-100 hover:to-green-200 transition-all duration-200"
                    onClick={() => setActiveTab("performance")}
                  >
                    {" "}
                    <div className="flex items-center justify-between">
                      {" "}
                      <div>
                        {" "}
                        <h3 className="text-lg font-semibold text-green-900 mb-1">
                          Improve your quality score?
                        </h3>{" "}
                        <p className="text-sm text-green-700">
                          View detailed performance metrics and improvement strategies
                        </p>{" "}
                      </div>{" "}
                      <div className="flex items-center space-x-2 text-green-600">
                        {" "}
                        <span className="text-sm font-medium">View Performance</span>{" "}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {" "}
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />{" "}
                        </svg>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* Program Performance Radar Chart */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              {" "}
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Program Performance Overview
              </h2>{" "}
              <div className="h-96">
                {" "}
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
                />{" "}
              </div>{" "}
              <div className="mt-4 text-sm text-gray-600">
                {" "}
                <p>
                  This radar chart shows your current performance across all programs. Focus on areas where you're below the maximum to increase your earnings and quality score.
                </p>{" "}
              </div>{" "}
            </div>{" "}
            {/* Quick Actions and Earnings Progress Side by Side */}{" "}
            <div className="flex flex-col lg:flex-row gap-8">
              {" "}
              {/* Quick Actions - Left Side */}{" "}
              <div className="w-full lg:w-1/3">
                {" "}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 h-full">
                  {" "}
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Time Sensitive Actions
                  </h2>{" "}
                  <div className="space-y-4">
                    {" "}
                    {urgentActions.map((action) => {
                      const IconComponent = action.icon;
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
                        <div
                          key={action.id}
                          className={`border rounded-xl p-4 hover:shadow-md transition-all duration-200 ${getPriorityColor(action.priority)}`}
                      >
                        {" "}
                          <div className="flex items-start justify-between mb-3">
                            {" "}
                            <div className="flex items-center space-x-3">
                              {" "}
                              <IconComponent className={`h-5 w-5 ${getPriorityTextColor(action.priority)}`} />{" "}
                              <h3 className="font-bold text-gray-900 text-base">
                                {action.title}
                        </h3>{" "}
                            </div>{" "}
                            <div className="flex items-center space-x-2">
                              {" "}
                              <Clock className="h-4 w-4 text-gray-500" />{" "}
                              <span className={`text-sm font-medium ${getPriorityTextColor(action.priority)}`}>
                                {action.daysLeft} days left
                              </span>{" "}
                            </div>{" "}
                          </div>{" "}
                          <p className="text-sm text-gray-600 mb-3">
                            {action.description}
                        </p>{" "}
                          <div className="flex items-center justify-between">
                            {" "}
                            <div className="flex items-center space-x-4">
                              {" "}
                              <span className="text-xs text-gray-500">
                                Due: {action.deadline}
                              </span>{" "}
                              <span className="text-xs text-gray-500">
                                {action.patients} patients
                              </span>{" "}
                        </div>{" "}
                            <button className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                              action.priority === "urgent"
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : action.priority === "high"
                                ? "bg-orange-600 hover:bg-orange-700 text-white"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}>
                              {" "}
                              {action.action}{" "}
                        </button>{" "}
                          </div>{" "}
                      </div>
                      );
                    })}{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              {/* Earnings Progress - Right Side */}{" "}
              <div className="w-full lg:w-2/3">
                {" "}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 h-full">
                  {" "}
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    Earnings Progress
                  </h2>{" "}
                  <div className="flex items-center justify-center">
                    {" "}
                    <div className="relative">
                      {" "}
                      {/* Gauge */}{" "}
                      <div className="relative w-64 h-64">
                        {" "}
                        <svg
                          className="w-64 h-64 transform -rotate-90"
                          viewBox="0 0 200 200"
                        >
                          {" "}
                          {/* Background circle */}{" "}
                          <circle
                            cx="100"
                            cy="100"
                            r="80"
                            stroke="#e5e7eb"
                            strokeWidth="20"
                            fill="none"
                          />{" "}
                          {/* Progress circle */}{" "}
                          <circle
                            cx="100"
                            cy="100"
                            r="80"
                            stroke="#3b82f6"
                            strokeWidth="20"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${
                              2 *
                              Math.PI *
                              80 *
                              (currentEarnings.yearToDate /
                                currentEarnings.target)
                            } ${2 * Math.PI * 80}`}
                            strokeDashoffset="0"
                          />{" "}
                          {/* Tick marks */}{" "}
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tick) => {
                            const angle = (tick / 10) * 360 - 90;
                            const x1 =
                              100 +
                              (tick === 0 || tick === 5 || tick === 10
                                ? 70
                                : 75) *
                                Math.cos((angle * Math.PI) / 180);
                            const y1 =
                              100 +
                              (tick === 0 || tick === 5 || tick === 10
                                ? 70
                                : 75) *
                                Math.sin((angle * Math.PI) / 180);
                            const x2 =
                              100 + 85 * Math.cos((angle * Math.PI) / 180);
                            const y2 =
                              100 + 85 * Math.sin((angle * Math.PI) / 180);
                            return (
                              <line
                                key={tick}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="#9ca3af"
                                strokeWidth={
                                  tick === 0 || tick === 5 || tick === 10
                                    ? "3"
                                    : "2"
                                }
                              />
                            );
                          })}{" "}
                          {/* Needle */}{" "}
                          <line
                            x1="100"
                            y1="100"
                            x2={
                              100 +
                              60 *
                                Math.cos(
                                  (((currentEarnings.yearToDate /
                                    currentEarnings.target) *
                                    360 -
                                    90) *
                                    Math.PI) /
                                    180
                                )
                            }
                            y2={
                              100 +
                              60 *
                                Math.sin(
                                  (((currentEarnings.yearToDate /
                                    currentEarnings.target) *
                                    360 -
                                    90) *
                                    Math.PI) /
                                    180
                                )
                            }
                            stroke="#ef4444"
                            strokeWidth="4"
                            strokeLinecap="round"
                          />{" "}
                          {/* Center circle */}{" "}
                          <circle cx="100" cy="100" r="6" fill="#ef4444" />{" "}
                        </svg>{" "}
                        {/* Scale labels */}{" "}
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600">
                          {" "}
                          10.0{" "}
                        </div>{" "}
                        <div className="absolute bottom-16 left-2 text-sm font-medium text-gray-600">
                          {" "}
                          0.0{" "}
                        </div>{" "}
                        <div className="absolute bottom-16 right-2 text-sm font-medium text-gray-600">
                          {" "}
                          10.0{" "}
                        </div>{" "}
                        {/* Center value */}{" "}
                        <div className="absolute inset-0 flex items-center justify-center">
                          {" "}
                          <div className="text-center bg-white rounded-full w-24 h-24 flex items-center justify-center border-4 border-gray-100">
                            {" "}
                            <div>
                              {" "}
                              <div className="text-2xl font-bold text-red-500">
                                {" "}
                                {(
                                  (currentEarnings.yearToDate /
                                    currentEarnings.target) *
                                  10
                                ).toFixed(1)}{" "}
                              </div>{" "}
                            </div>{" "}
                          </div>{" "}
                        </div>{" "}
                      </div>{" "}
                      {/* Benchmark labels */}{" "}
                      <div className="flex justify-center mt-4 space-x-4">
                        {" "}
                        <div className="bg-green-500 text-white px-3 py-1 rounded text-sm font-medium">
                          {" "}
                          competitor average: 4.0{" "}
                        </div>{" "}
                        <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
                          {" "}
                          industry average: 5.0{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    {/* Available Opportunities */}{" "}
                    <div className="ml-12 space-y-4">
                      {" "}
                      <div className="text-center">
                        {" "}
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Available Opportunities
                        </h3>{" "}
                        <div className="text-3xl font-bold text-green-600">
                          {" "}
                          {formatCurrency(
                            programs.reduce(
                              (sum, p) => sum + p.nextTierBonus,
                              0
                            )
                          )}{" "}
                        </div>{" "}
                        <div className="text-sm text-gray-600 mt-1">
                          Additional earnings potential
                        </div>{" "}
                      </div>{" "}
                      <div className="bg-green-50 rounded-lg p-4">
                        {" "}
                        <div className="text-sm text-gray-600 mb-2">
                          Total Possible This Year
                        </div>{" "}
                        <div className="text-xl font-bold text-gray-900">
                          {" "}
                          {formatCurrency(
                            currentEarnings.yearToDate +
                              programs.reduce(
                                (sum, p) => sum + p.nextTierBonus,
                                0
                              )
                          )}{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* Key Metrics Section */}{" "}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {" "}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-200">
                {" "}
                <div className="flex items-center justify-between">
                  {" "}
                  <div>
                    {" "}
                    <p className="text-gray-500 text-sm font-medium">Year to Date</p>{" "}
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {formatCurrency(currentEarnings.yearToDate)}
                    </p>{" "}
                  </div>{" "}
                  <DollarSign className="h-10 w-10 text-green-500" />{" "}
                </div>{" "}
                <div className="mt-4">
                  {" "}
                  <div className="flex items-center text-sm">
                    {" "}
                    <TrendingUp className="h-5 w-5 text-green-500 mr-2" />{" "}
                    <span className="text-green-600 font-medium">
                      {" "}
                      {(
                        (currentEarnings.yearToDate / currentEarnings.target) *
                        100
                      ).toFixed(1)}
                      % of target{" "}
                    </span>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-200">
                {" "}
                <div className="flex items-center justify-between">
                  {" "}
                  <div>
                    {" "}
                    <p className="text-gray-500 text-sm font-medium">
                      Active Programs
                    </p>{" "}
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {programs.length}
                    </p>{" "}
                  </div>{" "}
                  <Target className="h-10 w-10 text-blue-500" />{" "}
                </div>{" "}
                <div className="mt-4">
                  {" "}
                  <span className="text-sm text-gray-600 font-medium">
                    {" "}
                    {programs.filter((p) => p.status === "on-track").length} on
                    track{" "}
                  </span>{" "}
                </div>{" "}
              </div>{" "}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-200">
                {" "}
                <div className="flex items-center justify-between">
                  {" "}
                  <div>
                    {" "}
                    <p className="text-gray-500 text-sm font-medium">Total Patients</p>{" "}
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {" "}
                      {programs.reduce(
                        (sum, p) => sum + p.currentPatients,
                        0
                      )}{" "}
                    </p>{" "}
                  </div>{" "}
                  <Users className="h-10 w-10 text-purple-500" />{" "}
                </div>{" "}
                <div className="mt-4">
                  {" "}
                  <span className="text-sm text-gray-600 font-medium">
                    Across all programs
                  </span>{" "}
                </div>{" "}
              </div>{" "}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-200">
                {" "}
                <div className="flex items-center justify-between">
                  {" "}
                  <div>
                    {" "}
                    <p className="text-gray-500 text-sm font-medium">
                      Potential Earnings
                    </p>{" "}
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {" "}
                      {formatCurrency(
                        programs.reduce((sum, p) => sum + p.nextTierBonus, 0)
                      )}{" "}
                    </p>{" "}
                  </div>{" "}
                  <TrendingUp className="h-10 w-10 text-orange-500" />{" "}
                </div>{" "}
                <div className="mt-4">
                  {" "}
                  <span className="text-sm text-gray-600 font-medium">
                    Next tier bonuses
                  </span>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        )}{" "}
        {/* Opportunities Tab */}{" "}
        {activeTab === "opportunities" && (
          <div className="space-y-6">
            {" "}
            {/* Top Message */}{" "}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              {" "}
              <p className="text-blue-800">
                {" "}
                Opportunities sorted by impact on quality score and earnings. Higher weight = greater impact on reaching the minimum score of 1.0.{" "}
              </p>{" "}
            </div>{" "}
            {/* Opportunity Cards Grid */}{" "}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {" "}
              {sortedPrograms.map((program) => (
                <div
                  key={program.id}
                  className={`bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow flex flex-col ${
                    program.weight >= 3 ? 'border-gray-300 border-2' : 'border-gray-200'
                  }`}
                >
                  {" "}
                  {/* High Impact Badge */}
                  {program.weight >= 3 && (
                    <div className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 text-center">
                      HIGH IMPACT
                    </div>
                  )}
                  {" "}
                  {/* Opportunity Icon */}{" "}
                  <div className="flex justify-center pt-6">
                    {" "}
                    <Target className="w-8 h-8 text-gray-400" />{" "}
                  </div>{" "}
                  {/* Card Body */}{" "}
                  <div className="p-6 text-center flex flex-col flex-grow">
                    {" "}
                    <h3 className="font-bold text-gray-900 text-xl mb-3">
                      {" "}
                      {program.name}{" "}
                    </h3>{" "}
                    <div className="text-4xl font-bold text-gray-700 mb-4">
                      {" "}
                      {program.targetTier - program.currentPatients}{" "}
                    </div>{" "}
                    {/* Weight and Impact Indicators */}
                    <div className="flex justify-center space-x-3 mb-4">
                      {" "}
                      <div className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
                        Weight: {program.weight}
                      </div>{" "}
                      <div className="bg-gray-50 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
                        +{(program.qualityImpact * 100).toFixed(0)}% Quality
                      </div>{" "}
                    </div>{" "}
                    <div className="text-sm text-gray-600 mb-6 leading-relaxed flex-grow">
                      {" "}
                      {program.targetTier - program.currentPatients} more
                      members to reach tier {program.currentTier + 1}.<br />{" "}
                      Earns you {formatCurrency(program.nextTierBonus)}{" "}
                    </div>{" "}
                    {/* Action Button */}{" "}
                    <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-md transition-colors flex items-center justify-center mt-auto">
                      {" "}
                      Take Action{" "}
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {" "}
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />{" "}
                      </svg>{" "}
                    </button>{" "}
                  </div>{" "}
                </div>
              ))}{" "}
            </div>{" "}
            {/* Performance Overview Section */}{" "}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {" "}
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Performance Overview
              </h2>{" "}
              <div className="grid grid-cols-1 gap-6">
                {" "}
                {/* Estimated Annual Payouts */}{" "}
                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  {" "}
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Estimated Annual Payouts
                  </h3>{" "}
                  <div className="space-y-3">
                    {" "}
                    {programs.map((program) => (
                      <div
                        key={program.id}
                        className="flex justify-between items-center"
                      >
                        {" "}
                        <span className="text-sm text-gray-600">
                          {program.name}
                        </span>{" "}
                        <span className="font-medium text-gray-900">
                          {" "}
                          {formatCurrency(program.nextTierBonus * 0.8)}{" "}
                        </span>{" "}
                      </div>
                    ))}{" "}
                    <div className="border-t pt-2 mt-2">
                      {" "}
                      <div className="flex justify-between items-center">
                        {" "}
                        <span className="font-semibold text-gray-900">
                          Total Estimated
                        </span>{" "}
                        <span className="font-bold text-green-600">
                          {" "}
                          {formatCurrency(
                            programs.reduce(
                              (sum, p) => sum + p.nextTierBonus * 0.8,
                              0
                            )
                          )}{" "}
                        </span>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        )}{" "}
        {/* Missed Opportunities Tab */}{" "}
        {activeTab === "missed" && (
          <div className="space-y-6">
            {" "}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              {" "}
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Missed Opportunities
              </h2>{" "}
              <div className="space-y-6">
                {" "}
                {missedOpportunities.map((opportunity, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    {" "}
                    <div className="bg-red-50 border-l-4 border-red-400 p-6">
                    {" "}
                    <div className="flex items-center justify-between">
                      {" "}
                      <div className="flex-1">
                        {" "}
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {opportunity.program}
                        </h3>{" "}
                          <p className="text-gray-600 mb-3">{opportunity.reason}</p>{" "}
                          <div className="flex items-center space-x-6">
                          {" "}
                          <span className="text-sm text-gray-600">
                            {" "}
                            Missed Patients:{" "}
                              <strong className="text-red-600">{opportunity.missedPatients}</strong>{" "}
                          </span>{" "}
                          <span className="text-sm text-red-600">
                            {" "}
                            Lost Earnings:{" "}
                            <strong>
                              {formatCurrency(opportunity.potentialEarnings)}
                            </strong>{" "}
                          </span>{" "}
                        </div>{" "}
                      </div>{" "}
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => toggleTableExpansion(index)}
                            className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-gray-200 transition-colors border border-gray-200"
                          >
                            {expandedTables.has(index) ? (
                              <ChevronDown className="h-3 w-3" />
                            ) : (
                              <ChevronRight className="h-3 w-3" />
                            )}
                            <span>
                              {expandedTables.has(index) ? "Hide Members" : "View Members"}
                            </span>
                          </button>
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    {expandedTables.has(index) && (
                      <div className="bg-white border-t border-gray-200">
                        {" "}
                        <div className="p-6">
                          {" "}
                          <h4 className="text-base font-semibold text-gray-900 mb-4">
                            Missed Members List
                          </h4>{" "}
                          <div className="overflow-x-auto">
                            {" "}
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center space-x-1">
                                      <User className="h-4 w-4" />
                                      <span>Full Name</span>
                                    </div>
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center space-x-1">
                                      <Mail className="h-4 w-4" />
                                      <span>Email</span>
                                    </div>
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Member ID
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="h-4 w-4" />
                                      <span>Date of Birth</span>
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {opportunity.members.map((member, memberIndex) => (
                                  <tr key={memberIndex} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {member.fullName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {member.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {member.memberId}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {member.dob}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>{" "}
                      </div>{" "}
                    </div>{" "}
                      </div>
                    )}{" "}
                  </div>
                ))}{" "}
              </div>{" "}
              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                {" "}
                <div className="flex items-center justify-between">
                  {" "}
                  <div>
                    {" "}
                    <h3 className="text-xl font-semibold text-gray-900">
                      Total Missed Revenue
                    </h3>{" "}
                    <p className="text-gray-600 mt-1">
                      Revenue that could be recovered
                    </p>{" "}
                  </div>{" "}
                  <div className="text-3xl font-bold text-red-600">
                    {" "}
                    {formatCurrency(
                      missedOpportunities.reduce(
                        (sum, opp) => sum + opp.potentialEarnings,
                        0
                      )
                    )}{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        )}{" "}
        {/* Performance History Tab */}{" "}
        {activeTab === "performance" && (
          <div className="space-y-6">
            {" "}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {" "}
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Performance Comparison
              </h2>{" "}
              <div className="h-80">
                {" "}
                <div className="flex items-end justify-between h-full space-x-2">
                  {" "}
                  {performanceHistoryData.map((data, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center space-y-2 flex-1"
                    >
                      {" "}
                      <div className="flex space-x-1 h-64">
                        {" "}
                        <div className="w-4 bg-blue-200 rounded-t flex flex-col justify-end">
                          {" "}
                          <div
                            className="bg-blue-600 rounded-t w-full"
                            style={{
                              height: `${(data.previous / 60000) * 100}%`,
                            }}
                          ></div>{" "}
                        </div>{" "}
                        <div className="w-4 bg-green-200 rounded-t flex flex-col justify-end">
                          {" "}
                          <div
                            className="bg-green-600 rounded-t w-full"
                            style={{
                              height: `${(data.current / 60000) * 100}%`,
                            }}
                          ></div>{" "}
                        </div>{" "}
                      </div>{" "}
                      <span className="text-xs text-gray-600">
                        {data.month}
                      </span>{" "}
                    </div>
                  ))}{" "}
                </div>{" "}
                <div className="flex justify-center mt-4 space-x-4">
                  {" "}
                  <div className="flex items-center">
                    {" "}
                    <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>{" "}
                    <span className="text-sm text-gray-600">Previous Year</span>{" "}
                  </div>{" "}
                  <div className="flex items-center">
                    {" "}
                    <div className="w-4 h-4 bg-green-600 rounded mr-2"></div>{" "}
                    <span className="text-sm text-gray-600">Current Year</span>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
};
export default MedicalProviderDashboard;
