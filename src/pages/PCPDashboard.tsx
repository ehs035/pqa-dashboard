import { useState, useEffect } from "react";
import {
  Users,
  FileText,
  AlertCircle,
  MessageSquare,
  Calendar,
  Clock,
  ChevronDown,
  Bell,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  TrendingUp,
  Star,
  Shield,
  Heart,
  Activity,
  UserCheck,
  FileCheck,
  Send,
  Download,
  Settings,
  Home,
  BarChart3,
  ClipboardList,
  Target,
  Zap,
  X,
  Save,
  Share2,
  PieChart,
  BarChart,
  LineChart,
  DollarSign
} from "lucide-react";

const PCPDashboard = () => {
  const [activeSection, setActiveSection] = useState("patients");
  const [selectedProvider, setSelectedProvider] = useState(0);
  const [isProviderDropdownOpen, setIsProviderDropdownOpen] = useState(false);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [isWidgetDialogOpen, setIsWidgetDialogOpen] = useState(false);
  const [customWidgets, setCustomWidgets] = useState([]);
  const [activeWidgetTab, setActiveWidgetTab] = useState('general');

  // Provider data with different patient rosters and metrics
  const providers = [
    {
      id: "PCP001",
      name: "Dr. Sarah Johnson",
      avatar: "SJ",
      specialty: "Internal Medicine",
      patients: [
        {
          id: "P001",
          name: "John Smith",
          age: 65,
          riskScore: 0.8,
          coverage: "Medicare Advantage",
          lastVisit: "2024-01-15",
          nextAppointment: "2024-02-15",
          conditions: ["Hypertension", "Diabetes"],
          avatar: "JS"
        },
        {
          id: "P002", 
          name: "Maria Garcia",
          age: 42,
          riskScore: 0.6,
          coverage: "Commercial",
          lastVisit: "2024-01-10",
          nextAppointment: "2024-02-20",
          conditions: ["Hypertension"],
          avatar: "MG"
        },
        {
          id: "P003",
          name: "Robert Johnson",
          age: 58,
          riskScore: 0.9,
          coverage: "Medicare",
          lastVisit: "2024-01-08",
          nextAppointment: "2024-02-12",
          conditions: ["Hypertension", "Diabetes", "COPD"],
          avatar: "RJ"
        }
      ],
      qualityMetrics: [
        {
          name: "HEDIS Score",
          value: "87%",
          target: "90%",
          status: "warning",
          trend: "+2%"
        },
        {
          name: "Star Rating",
          value: "4.2",
          target: "4.5",
          status: "good",
          trend: "+0.1"
        },
        {
          name: "P4P Progress",
          value: "78%",
          target: "85%",
          status: "warning",
          trend: "+5%"
        }
      ],
      alerts: [
        {
          id: 1,
          type: "urgent",
          message: "10 hypertensive patients need screenings to reach next incentive tier",
          icon: AlertCircle,
          color: "text-red-600"
        },
        {
          id: 2,
          type: "info",
          message: "Referral #103 pending feedback — contact specialist",
          icon: MessageSquare,
          color: "text-blue-600"
        },
        {
          id: 3,
          type: "success",
          message: "5 patients completed preventive screenings this week",
          icon: CheckCircle,
          color: "text-green-600"
        },
        {
          id: 4,
          type: "warning",
          message: "3 diabetic patients overdue for HbA1c testing",
          icon: AlertCircle,
          color: "text-yellow-600"
        },
        {
          id: 5,
          type: "info",
          message: "New patient John Smith scheduled for initial consultation",
          icon: Calendar,
          color: "text-blue-600"
        },
        {
          id: 6,
          type: "urgent",
          message: "Medication reconciliation needed for 7 patients",
          icon: FileText,
          color: "text-red-600"
        }
      ],
      tasks: [
        {
          id: 1,
          title: "Review pending authorizations",
          count: 3,
          priority: "high",
          icon: FileCheck
        },
        {
          id: 2,
          title: "Follow up on referrals",
          count: 7,
          priority: "medium",
          icon: Send
        },
        {
          id: 3,
          title: "Update care plans",
          count: 12,
          priority: "low",
          icon: Edit
        },
        {
          id: 4,
          title: "Quality measure reviews",
          count: 5,
          priority: "high",
          icon: Target
        }
      ],
      capitation: {
        monthly: 45000,
        riskAdjustment: 5000,
        qualityBonus: 3000
      }
    },
    {
      id: "PCP002",
      name: "Dr. Michael Chen",
      avatar: "MC",
      specialty: "Behavioral Health",
      patients: [
        {
          id: "P004",
          name: "Sarah Martinez",
          age: 28,
          riskScore: 0.8,
          coverage: "Commercial",
          lastVisit: "2024-01-20",
          nextAppointment: "2024-02-15",
          conditions: ["Anxiety", "PHQ-9: 12", "GAD-7: 8"],
          avatar: "SM",
          phq9Score: 12,
          gad7Score: 8,
          remainingVisits: 8,
          consentVerified: true
        },
        {
          id: "P005",
          name: "David Thompson",
          age: 45,
          riskScore: 0.9,
          coverage: "Medicare",
          lastVisit: "2024-01-18",
          nextAppointment: "2024-02-20",
          conditions: ["Depression", "PHQ-9: 18", "SDOH: Housing"],
          avatar: "DT",
          phq9Score: 18,
          gad7Score: 5,
          remainingVisits: 3,
          consentVerified: true
        },
        {
          id: "P006",
          name: "Maria Rodriguez",
          age: 35,
          riskScore: 0.6,
          coverage: "Medicaid",
          lastVisit: "2024-01-15",
          nextAppointment: "2024-02-22",
          conditions: ["PTSD", "PHQ-9: 8", "GAD-7: 12"],
          avatar: "MR",
          phq9Score: 8,
          gad7Score: 12,
          remainingVisits: 12,
          consentVerified: false
        },
        {
          id: "P007",
          name: "James Kim",
          age: 52,
          riskScore: 0.7,
          coverage: "Commercial",
          lastVisit: "2024-01-22",
          nextAppointment: "2024-02-25",
          conditions: ["Bipolar", "PHQ-9: 15", "SDOH: Employment"],
          avatar: "JK",
          phq9Score: 15,
          gad7Score: 6,
          remainingVisits: 6,
          consentVerified: true
        },
        {
          id: "P008",
          name: "Emily Chen",
          age: 24,
          riskScore: 0.5,
          coverage: "Commercial",
          lastVisit: "2024-01-25",
          nextAppointment: "2024-03-01",
          conditions: ["Anxiety", "PHQ-9: 6", "GAD-7: 9"],
          avatar: "EC",
          phq9Score: 6,
          gad7Score: 9,
          remainingVisits: 15,
          consentVerified: true
        }
      ],
      qualityMetrics: [
        {
          name: "PHQ-9 Completion",
          value: "96%",
          target: "90%",
          status: "excellent",
          trend: "+4%"
        },
        {
          name: "Crisis Prevention",
          value: "98%",
          target: "95%",
          status: "excellent",
          trend: "+2%"
        },
        {
          name: "SDOH Screening",
          value: "89%",
          target: "85%",
          status: "good",
          trend: "+6%"
        }
      ],
      alerts: [
        {
          id: 1,
          type: "urgent",
          message: "Patient X sessions expiring — request renewal",
          icon: AlertCircle,
          color: "text-red-600"
        },
        {
          id: 2,
          type: "warning",
          message: "High PHQ-9 score change detected — schedule follow-up",
          icon: AlertCircle,
          color: "text-yellow-600"
        },
        {
          id: 3,
          type: "info",
          message: "3 patients need consent verification for telehealth",
          icon: FileText,
          color: "text-blue-600"
        },
        {
          id: 4,
          type: "success",
          message: "Crisis intervention prevented 2 emergency visits this week",
          icon: CheckCircle,
          color: "text-green-600"
        },
        {
          id: 5,
          type: "info",
          message: "SDOH screening completed for 8 patients this month",
          icon: UserCheck,
          color: "text-blue-600"
        },
        {
          id: 6,
          type: "warning",
          message: "2 patients overdue for GAD-7 reassessment",
          icon: Clock,
          color: "text-yellow-600"
        }
      ],
      tasks: [
        {
          id: 1,
          title: "PHQ-9/GAD-7 reassessments",
          count: 7,
          priority: "high",
          icon: Target
        },
        {
          id: 2,
          title: "Consent verification pending",
          count: 3,
          priority: "high",
          icon: FileCheck
        },
        {
          id: 3,
          title: "SDOH screening follow-ups",
          count: 5,
          priority: "medium",
          icon: UserCheck
        },
        {
          id: 4,
          title: "Crisis resource referrals",
          count: 2,
          priority: "urgent",
          icon: AlertCircle
        },
        {
          id: 5,
          title: "Telehealth session scheduling",
          count: 8,
          priority: "medium",
          icon: Calendar
        },
        {
          id: 6,
          title: "Authorization renewals",
          count: 4,
          priority: "high",
          icon: FileText
        }
      ],
      capitation: {
        monthly: 48000,
        riskAdjustment: 12000,
        qualityBonus: 8500
      }
    },
    {
      id: "PCP003",
      name: "Dr. Emily Rodriguez",
      avatar: "ER",
      specialty: "Pediatrics",
      patients: [
        {
          id: "P008",
          name: "Emma Thompson",
          age: 8,
          riskScore: 0.2,
          coverage: "Commercial",
          lastVisit: "2024-01-22",
          nextAppointment: "2024-02-28",
          conditions: ["Wellness", "Vaccinations"],
          avatar: "ET"
        },
        {
          id: "P009",
          name: "Noah Martinez",
          age: 12,
          riskScore: 0.3,
          coverage: "Medicaid",
          lastVisit: "2024-01-19",
          nextAppointment: "2024-03-05",
          conditions: ["Asthma"],
          avatar: "NM"
        },
        {
          id: "P010",
          name: "Sophia Anderson",
          age: 5,
          riskScore: 0.1,
          coverage: "Commercial",
          lastVisit: "2024-01-16",
          nextAppointment: "2024-04-15",
          conditions: ["Wellness"],
          avatar: "SA"
        },
        {
          id: "P011",
          name: "Liam Johnson",
          age: 15,
          riskScore: 0.4,
          coverage: "Commercial",
          lastVisit: "2024-01-11",
          nextAppointment: "2024-02-22",
          conditions: ["Sports Physical", "ADHD"],
          avatar: "LJ"
        },
        {
          id: "P012",
          name: "Ava Garcia",
          age: 3,
          riskScore: 0.1,
          coverage: "Medicaid",
          lastVisit: "2024-01-13",
          nextAppointment: "2024-03-20",
          conditions: ["Wellness", "Developmental"],
          avatar: "AG"
        }
      ],
      qualityMetrics: [
        {
          name: "HEDIS Score",
          value: "91%",
          target: "88%",
          status: "good",
          trend: "+1%"
        },
        {
          name: "Star Rating",
          value: "4.4",
          target: "4.2",
          status: "good",
          trend: "+0.1"
        },
        {
          name: "P4P Progress",
          value: "86%",
          target: "80%",
          status: "good",
          trend: "+4%"
        }
      ],
      alerts: [
        {
          id: 1,
          type: "info",
          message: "8 children due for routine vaccinations this month",
          icon: Shield,
          color: "text-blue-600"
        },
        {
          id: 2,
          type: "warning",
          message: "2 asthma patients need action plan updates",
          icon: AlertCircle,
          color: "text-yellow-600"
        },
        {
          id: 3,
          type: "success",
          message: "All developmental screenings completed on schedule",
          icon: CheckCircle,
          color: "text-green-600"
        },
        {
          id: 4,
          type: "urgent",
          message: "5 children overdue for well-child visits",
          icon: AlertCircle,
          color: "text-red-600"
        },
        {
          id: 5,
          type: "info",
          message: "Sports physical season starting - 12 appointments scheduled",
          icon: Activity,
          color: "text-blue-600"
        },
        {
          id: 6,
          type: "success",
          message: "Immunization rates improved to 95% this quarter",
          icon: Shield,
          color: "text-green-600"
        }
      ],
      tasks: [
        {
          id: 1,
          title: "Vaccination schedules",
          count: 8,
          priority: "high",
          icon: Shield
        },
        {
          id: 2,
          title: "Developmental assessments",
          count: 5,
          priority: "medium",
          icon: Activity
        },
        {
          id: 3,
          title: "Sports physicals",
          count: 12,
          priority: "medium",
          icon: UserCheck
        },
        {
          id: 4,
          title: "Parent education materials",
          count: 6,
          priority: "low",
          icon: FileText
        }
      ],
      capitation: {
        monthly: 38000,
        riskAdjustment: 2000,
        qualityBonus: 4500
      }
    }
  ];

  // Get current provider data
  const currentProvider = providers[selectedProvider];
  const patients = currentProvider.patients;
  const qualityMetrics = currentProvider.qualityMetrics;
  const alerts = currentProvider.alerts;
  const tasks = currentProvider.tasks;
  const capitation = currentProvider.capitation;

  // Message rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlertIndex((prevIndex) => 
        (prevIndex + 1) % alerts.length
      );
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(interval);
  }, [alerts.length]);

  // Reset alert index when provider changes
  useEffect(() => {
    setCurrentAlertIndex(0);
  }, [selectedProvider]);

  const currentAlert = alerts[currentAlertIndex];

  // Available widgets organized by category
  const widgetCategories = {
    general: [
      {
        id: 'metric-card',
        name: 'Metric Card',
        description: 'Display key performance indicators',
        icon: BarChart3,
        type: 'metric'
      },
      {
        id: 'pie-chart',
        name: 'Pie Chart',
        description: 'Show data distribution',
        icon: PieChart,
        type: 'chart'
      },
      {
        id: 'bar-chart',
        name: 'Bar Chart',
        description: 'Compare values across categories',
        icon: BarChart,
        type: 'chart'
      }
    ],
    p4p: [
      {
        id: 'quality-score',
        name: 'Quality Score',
        description: 'HEDIS and Star Rating metrics',
        icon: Star,
        type: 'p4p'
      },
      {
        id: 'performance-trends',
        name: 'Performance Trends',
        description: 'Track quality improvements over time',
        icon: TrendingUp,
        type: 'p4p'
      },
      {
        id: 'incentive-tracking',
        name: 'Incentive Tracking',
        description: 'Monitor P4P earnings and targets',
        icon: Target,
        type: 'p4p'
      }
    ],
    claims: [
      {
        id: 'claims-volume',
        name: 'Claims Volume',
        description: 'Track daily and monthly claims',
        icon: FileText,
        type: 'claims'
      },
      {
        id: 'denial-rates',
        name: 'Denial Rates',
        description: 'Monitor claim denial percentages',
        icon: XCircle,
        type: 'claims'
      },
      {
        id: 'processing-time',
        name: 'Processing Time',
        description: 'Average claim processing duration',
        icon: Clock,
        type: 'claims'
      }
    ],
    notifications: [
      {
        id: 'alert-summary',
        name: 'Alert Summary',
        description: 'Overview of system alerts and notifications',
        icon: Bell,
        type: 'notifications'
      },
      {
        id: 'task-queue',
        name: 'Task Queue',
        description: 'Pending tasks and assignments',
        icon: ClipboardList,
        type: 'notifications'
      },
      {
        id: 'message-center',
        name: 'Message Center',
        description: 'Internal communications and updates',
        icon: MessageSquare,
        type: 'notifications'
      }
    ],
    financials: [
      {
        id: 'revenue-chart',
        name: 'Revenue Chart',
        description: 'Monthly revenue trends and projections',
        icon: LineChart,
        type: 'financials'
      },
      {
        id: 'capitation-summary',
        name: 'Capitation Summary',
        description: 'Monthly capitation and adjustments',
        icon: DollarSign,
        type: 'financials'
      },
      {
        id: 'cost-analysis',
        name: 'Cost Analysis',
        description: 'Breakdown of operational costs',
        icon: BarChart3,
        type: 'financials'
      }
    ]
  };

  const tabs = [
    { id: 'general', name: 'General', icon: BarChart3 },
    { id: 'p4p', name: 'P4P', icon: Star },
    { id: 'claims', name: 'Claims', icon: FileText },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'financials', name: 'Financials', icon: DollarSign }
  ];

  // Add widget to dashboard
  const addWidget = (widget) => {
    const newWidget = {
      id: `${widget.id}-${Date.now()}`,
      ...widget,
      data: generateWidgetData(widget.type)
    };
    setCustomWidgets([...customWidgets, newWidget]);
    setIsWidgetDialogOpen(false);
  };

  // Generate sample data for widgets
  const generateWidgetData = (type) => {
    switch (type) {
      case 'metric':
        return {
          title: 'Patient Satisfaction',
          value: '94%',
          change: '+5%',
          trend: 'up'
        };
      case 'chart':
        return {
          title: 'Patient Demographics',
          data: [
            { label: 'Medicare', value: 45, color: '#3B82F6' },
            { label: 'Commercial', value: 35, color: '#10B981' },
            { label: 'Medicaid', value: 20, color: '#F59E0B' }
          ]
        };
      case 'p4p':
        return {
          title: 'Quality Performance',
          value: '87%',
          target: '90%',
          trend: '+3%'
        };
      case 'claims':
        return {
          title: 'Claims Processing',
          value: '1,247',
          period: 'This Month',
          change: '+12%'
        };
      case 'notifications':
        return {
          title: 'System Alerts',
          count: 8,
          urgent: 2,
          pending: 6
        };
      case 'financials':
        return {
          title: 'Revenue Trends',
          data: [
            { month: 'Jan', revenue: 45000 },
            { month: 'Feb', revenue: 52000 },
            { month: 'Mar', revenue: 48000 },
            { month: 'Apr', revenue: 55000 },
            { month: 'May', revenue: 61000 },
            { month: 'Jun', revenue: 58000 }
          ],
          current: 58000,
          change: '+12%'
        };
      default:
        return {};
    }
  };

  // Remove widget from dashboard
  const removeWidget = (widgetId) => {
    setCustomWidgets(customWidgets.filter(w => w.id !== widgetId));
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

  const getRiskScoreColor = (score: number) => {
    if (score >= 0.8) return "text-red-600 bg-red-50";
    if (score >= 0.6) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner with Patient Panel and Alerts */}
      <div className="bg-[#01213E] border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center">
              {/* PQA Logo */}
              <div className="flex-shrink-0">
                <img 
                  src="/logo-subline-light.svg" 
                  alt="PQA Logo" 
                  className="h-12 w-auto"
                />
              </div>
            </div>

            {/* Center: Rotating Alerts */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="flex items-center space-x-3">
                <currentAlert.icon className={`h-5 w-5 ${currentAlert.color}`} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">
                    {currentAlert.message}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentAlertIndex((prev) => 
                      prev === 0 ? alerts.length - 1 : prev - 1
                    )}
                    className="p-1 text-gray-300 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="flex space-x-1">
                    {alerts.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentAlertIndex ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentAlertIndex((prev) => 
                      (prev + 1) % alerts.length
                    )}
                    className="p-1 text-gray-300 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Provider Dropdown and Quick Actions */}
            <div className="flex items-center space-x-4">
              {/* Provider Dropdown - Subtle */}
              <div className="relative">
                <button
                  onClick={() => setIsProviderDropdownOpen(!isProviderDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors py-1"
                >
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {currentProvider.avatar}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">
                      {currentProvider.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {currentProvider.specialty}
                    </div>
                  </div>
                  <ChevronDown className="h-3 w-3 text-gray-400" />
                </button>
                {isProviderDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-64">
                    {providers.map((provider, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedProvider(index);
                          setIsProviderDropdownOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                          index === selectedProvider ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {provider.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {provider.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {provider.specialty} | {provider.patients.length} patients
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-300 hover:text-white transition-colors">
                  <Search className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-300 hover:text-white transition-colors">
                  <Filter className="h-5 w-5" />
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setIsSettingsDropdownOpen(!isSettingsDropdownOpen)}
                    className="p-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <Settings className="h-5 w-5" />
                  </button>
                  {isSettingsDropdownOpen && (
                    <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 min-w-48">
                      <button
                        onClick={() => {
                          setIsWidgetDialogOpen(true);
                          setIsSettingsDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-900">Add Widget</span>
                      </button>
                      <button
                        onClick={() => {
                          // Save dashboard functionality
                          alert('Dashboard saved successfully!');
                          setIsSettingsDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        <Save className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-900">Save Dashboard</span>
                      </button>
                      <button
                        onClick={() => {
                          // Share dashboard functionality
                          alert('Dashboard sharing link copied to clipboard!');
                          setIsSettingsDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        <Share2 className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-gray-900">Share Dashboard</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Navigation */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-6">
              <Home className="h-6 w-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">PCP Portal</h2>
            </div>
            
            <nav className="space-y-2">
              <button
                onClick={() => setActiveSection("patients")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === "patients" 
                    ? "bg-blue-50 text-blue-700 border border-blue-200" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Users className="h-5 w-5" />
                <span className="font-medium">Patients</span>
              </button>
              
              <button
                onClick={() => setActiveSection("claims")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === "claims" 
                    ? "bg-blue-50 text-blue-700 border border-blue-200" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FileText className="h-5 w-5" />
                <span className="font-medium">Claims</span>
              </button>
              
              <button
                onClick={() => setActiveSection("quality")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === "quality" 
                    ? "bg-blue-50 text-blue-700 border border-blue-200" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                <span className="font-medium">Quality</span>
              </button>
              
              <button
                onClick={() => setActiveSection("authorizations")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === "authorizations" 
                    ? "bg-blue-50 text-blue-700 border border-blue-200" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FileCheck className="h-5 w-5" />
                <span className="font-medium">Authorizations</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
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

          {/* Content based on active section */}
          {activeSection === "patients" && (
            <div className="space-y-6">
              {/* Metric Cards - Only for Internal Medicine */}
              {currentProvider.specialty === "Internal Medicine" && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Total Patients */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Patients</p>
                        <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
                        <p className="text-xs text-gray-500 mt-1">Active roster</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  {/* High Risk Patients */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">High Risk Patients</p>
                        <p className="text-2xl font-bold text-red-600">
                          {patients.filter(p => p.riskScore >= 0.8).length}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {Math.round((patients.filter(p => p.riskScore >= 0.8).length / patients.length) * 100)}% of total
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                      </div>
                    </div>
                  </div>

                  {/* Chronic Conditions */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Chronic Conditions</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {patients.reduce((acc, patient) => {
                            return acc + patient.conditions.filter(condition => 
                              ['Hypertension', 'Diabetes', 'COPD'].includes(condition)
                            ).length;
                          }, 0)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Total conditions</p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Activity className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                  </div>

                  {/* Medicare Patients */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Medicare Patients</p>
                        <p className="text-2xl font-bold text-green-600">
                          {patients.filter(p => p.coverage.includes('Medicare')).length}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {Math.round((patients.filter(p => p.coverage.includes('Medicare')).length / patients.length) * 100)}% of total
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Heart className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Patient Roster Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Patient Roster</h2>
                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>Add Patient</span>
                  </button>
                </div>
                
                {/* Patient List - Conditional Layout */}
                {currentProvider.specialty === "Behavioral Health" ? (
                  /* Card Layout for Behavioral Health */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {patients.map((patient, index) => {
                      const getRiskCardColor = (score: number) => {
                        if (score >= 0.8) return "border-l-red-500 bg-red-50";
                        if (score >= 0.6) return "border-l-yellow-500 bg-yellow-50";
                        return "border-l-green-500 bg-green-50";
                      };

                      const getRiskTextColor = (score: number) => {
                        if (score >= 0.8) return "text-red-600";
                        if (score >= 0.6) return "text-yellow-600";
                        return "text-green-600";
                      };

                      return (
                        <div key={patient.id} className={`relative p-4 rounded-lg border-l-4 ${getRiskCardColor(patient.riskScore)} hover:shadow-md transition-all duration-200`}>
                          {/* Risk Level Badge */}
                          <div className="absolute top-3 right-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskTextColor(patient.riskScore)} bg-white`}>
                              Risk: {patient.riskScore}
                            </span>
                          </div>

                          {/* Patient Header */}
                          <div className="flex items-start space-x-3 mb-3">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {patient.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-semibold text-gray-900 truncate">
                                {patient.name}
                              </h3>
                              <p className="text-xs text-gray-500">
                                Age {patient.age} • {patient.coverage}
                              </p>
                            </div>
                          </div>

                          {/* Patient Info */}
                          <div className="space-y-2 mb-3">
                            <div className="text-xs text-gray-600">
                              <span className="font-medium">Last visit:</span> {patient.lastVisit}
                            </div>
                            <div className="text-xs text-gray-600">
                              <span className="font-medium">Next appointment:</span> {patient.nextAppointment}
                            </div>
                          </div>

                          {/* Conditions Tags */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {patient.conditions.map((condition, idx) => (
                              <span key={idx} className={`text-xs px-2 py-1 rounded-full ${
                                condition.includes('PHQ-9') || condition.includes('GAD-7') 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : condition.includes('SDOH')
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {condition}
                              </span>
                            ))}
                          </div>

                          {/* Behavioral Health Specific Info */}
                          {patient.remainingVisits !== undefined && (
                            <div className="space-y-1 mb-3">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-600">Remaining visits:</span>
                                <span className="font-medium">{patient.remainingVisits}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-600">Consent:</span>
                                <span className={`font-medium ${patient.consentVerified ? 'text-green-600' : 'text-red-600'}`}>
                                  {patient.consentVerified ? '✓ Verified' : '⚠ Pending'}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex justify-end space-x-2 pt-2 border-t border-gray-200">
                            <button className="p-1.5 text-gray-400 hover:text-green-600 transition-colors">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-green-600 transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-green-600 transition-colors">
                              <MessageSquare className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Row Layout for Other Providers */
                  <div className="space-y-3">
                    {patients.map((patient, index) => (
                      <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                            {patient.avatar}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{patient.name}</div>
                            <div className="text-sm text-gray-500">
                              Age: {patient.age} | {patient.coverage} | Last visit: {patient.lastVisit}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              {patient.conditions.map((condition, idx) => (
                                <span key={idx} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                  {condition}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskScoreColor(patient.riskScore)}`}>
                            Risk: {patient.riskScore}
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Care Coordination Hub */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Care Coordination Hub</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Send className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-gray-900">Referrals</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">7</div>
                    <div className="text-sm text-gray-600">Pending feedback</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-gray-900">Messages</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <div className="text-sm text-gray-600">Unread</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Activity className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium text-gray-900">ADT Alerts</span>
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">3</div>
                    <div className="text-sm text-gray-600">New admissions</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "quality" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Tracking</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {qualityMetrics.map((metric, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{metric.name}</span>
                        <span className={`text-sm px-2 py-1 rounded ${
                          metric.status === 'excellent' ? 'bg-green-100 text-green-800' :
                          metric.status === 'good' ? 'bg-green-100 text-green-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {metric.trend}
                        </span>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
                      <div className="text-sm text-gray-600">Target: {metric.target}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "authorizations" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Authorizations</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">Authorization #{item}03</div>
                        <div className="text-sm text-gray-600">MRI - Lumbar Spine | Patient: John Smith</div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          Approve
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                          Deny
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Custom Widgets Section */}
          {customWidgets.length > 0 && (
            <div className="space-y-6 pt-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Custom Widgets</h2>
                  <span className="text-sm text-gray-500">{customWidgets.length} widget(s)</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {customWidgets.map((widget) => (
                    <div key={widget.id} className="relative p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <button
                        onClick={() => removeWidget(widget.id)}
                        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <widget.icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">{widget.name}</h3>
                          <p className="text-xs text-gray-500">{widget.description}</p>
                        </div>
                      </div>

                      {/* Widget Content */}
                      {widget.type === 'metric' && (
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-gray-900">{widget.data.value}</div>
                          <div className="text-sm text-gray-600">{widget.data.title}</div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              widget.data.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {widget.data.change}
                            </span>
                          </div>
                        </div>
                      )}

                      {widget.type === 'chart' && (
                        <div className="space-y-2">
                          <div className="text-sm font-semibold text-gray-900">{widget.data.title}</div>
                          <div className="space-y-1">
                            {widget.data.data.map((item, index) => (
                              <div key={index} className="flex items-center justify-between text-xs">
                                <div className="flex items-center space-x-2">
                                  <div 
                                    className="w-3 h-3 rounded-full" 
                                    style={{ backgroundColor: item.color }}
                                  />
                                  <span className="text-gray-600">{item.label}</span>
                                </div>
                                <span className="font-medium">{item.value}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {widget.type === 'p4p' && (
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-gray-900">{widget.data.value}</div>
                          <div className="text-sm text-gray-600">{widget.data.title}</div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Target: {widget.data.target}</span>
                            <span className="text-green-600 font-medium">{widget.data.trend}</span>
                          </div>
                        </div>
                      )}

                      {widget.type === 'claims' && (
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-gray-900">{widget.data.value}</div>
                          <div className="text-sm text-gray-600">{widget.data.title}</div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">{widget.data.period}</span>
                            <span className="text-green-600 font-medium">{widget.data.change}</span>
                          </div>
                        </div>
                      )}

                      {widget.type === 'notifications' && (
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-gray-900">{widget.data.count}</div>
                          <div className="text-sm text-gray-600">{widget.data.title}</div>
                          <div className="flex items-center space-x-4 text-xs">
                            <span className="text-red-600">Urgent: {widget.data.urgent}</span>
                            <span className="text-yellow-600">Pending: {widget.data.pending}</span>
                          </div>
                        </div>
                      )}

                      {widget.type === 'financials' && (
                        <div className="space-y-2">
                          <div className="text-sm font-semibold text-gray-900">{widget.data.title}</div>
                          <div className="h-20 flex items-end space-x-1">
                            {widget.data.data.map((item, index) => (
                              <div key={index} className="flex flex-col items-center space-y-1">
                                <div 
                                  className="w-3 bg-blue-400 rounded-t"
                                  style={{ height: `${(item.revenue / 65000) * 60}px` }}
                                />
                                <span className="text-xs text-gray-500">{item.month}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Current: ${(widget.data.current / 1000).toFixed(0)}K</span>
                            <span className="text-green-600 font-medium">{widget.data.change}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar with Tasks */}
        <div className="w-80 bg-white border-l border-gray-200 min-h-screen p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tasks & Insights</h3>
          
          {/* Reactive Insights */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Reactive Insights</h4>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start space-x-2">
                    <alert.icon className={`h-4 w-4 mt-0.5 ${alert.color}`} />
                    <div className="text-sm text-gray-700">{alert.message}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Tasks</h4>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <task.icon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{task.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className="text-sm font-bold text-blue-600">{task.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capitation Dashboard */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Capitation Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Monthly Capitation</span>
                <span className="font-medium">{formatShortCurrency(capitation.monthly)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Risk Adjustment</span>
                <span className="font-medium text-green-600">+{formatShortCurrency(capitation.riskAdjustment)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Quality Bonus</span>
                <span className="font-medium text-green-600">+{formatShortCurrency(capitation.qualityBonus)}</span>
              </div>
              <div className="border-t border-blue-200 pt-2 mt-2">
                <div className="flex justify-between text-sm font-semibold">
                  <span>Total</span>
                  <span>{formatShortCurrency(capitation.monthly + capitation.riskAdjustment + capitation.qualityBonus)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Widget Dialog */}
      {isWidgetDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Add Widget</h2>
              <button
                onClick={() => {
                  setIsWidgetDialogOpen(false);
                  setActiveWidgetTab('general');
                }}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveWidgetTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeWidgetTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-6">Choose a widget to add to your dashboard:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {widgetCategories[activeWidgetTab]?.map((widget) => (
                  <button
                    key={widget.id}
                    onClick={() => addWidget(widget)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <widget.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{widget.name}</h3>
                        <p className="text-sm text-gray-600">{widget.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Special Revenue Chart for Financials tab */}
              {activeWidgetTab === 'financials' && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Chart Preview</h3>
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Monthly Revenue Trends</h4>
                      <span className="text-sm text-green-600 font-medium">+12% vs last month</span>
                    </div>
                    <div className="h-32 flex items-end space-x-2">
                      {[
                        { month: 'Jan', value: 45, color: 'bg-blue-200' },
                        { month: 'Feb', value: 52, color: 'bg-blue-300' },
                        { month: 'Mar', value: 48, color: 'bg-blue-200' },
                        { month: 'Apr', value: 55, color: 'bg-blue-400' },
                        { month: 'May', value: 61, color: 'bg-blue-500' },
                        { month: 'Jun', value: 58, color: 'bg-blue-400' }
                      ].map((item, index) => (
                        <div key={index} className="flex flex-col items-center space-y-2">
                          <div 
                            className={`w-8 ${item.color} rounded-t`}
                            style={{ height: `${item.value * 2}px` }}
                          />
                          <span className="text-xs text-gray-600">{item.month}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-xs text-gray-500">
                      Revenue data from the last 6 months showing growth trends
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setIsWidgetDialogOpen(false);
                  setActiveWidgetTab('general');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PCPDashboard;
