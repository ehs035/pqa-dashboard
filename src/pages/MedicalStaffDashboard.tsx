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
  DollarSign,
  Phone,
  Video,
  Stethoscope,
  Pill,
  Syringe,
  Bandage,
  Home as HomeIcon,
  Truck,
  Bed,
  Accessibility,
  ArrowLeft
} from "lucide-react";

const MedicalStaffDashboard = () => {
  const [activeSection, setActiveSection] = useState("outreach");
  const [selectedPatient, setSelectedPatient] = useState(0);
  const [isPatientDropdownOpen, setIsPatientDropdownOpen] = useState(false);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [isWidgetDialogOpen, setIsWidgetDialogOpen] = useState(false);
  const [customWidgets, setCustomWidgets] = useState([]);
  const [activeWidgetTab, setActiveWidgetTab] = useState('general');

  // Mock data for Medical Staff
  const highRiskPatients = [
    {
      id: "P001",
      name: "John Smith",
      age: 72,
      riskScore: 0.9,
      conditions: ["CHF", "Diabetes", "Hypertension"],
      lastContact: "2024-01-15",
      nextAppointment: "2024-02-15",
      priority: "high",
      status: "discharged",
      avatar: "JS",
      careGaps: ["A1C overdue", "Medication review needed"],
      followUpRequired: true
    },
    {
      id: "P002",
      name: "Maria Garcia",
      age: 68,
      riskScore: 0.8,
      conditions: ["COPD", "Depression"],
      lastContact: "2024-01-18",
      nextAppointment: "2024-02-20",
      priority: "high",
      status: "active",
      avatar: "MG",
      careGaps: ["Depression screening", "Pneumonia vaccine"],
      followUpRequired: false
    },
    {
      id: "P003",
      name: "Robert Johnson",
      age: 75,
      riskScore: 0.95,
      conditions: ["Dementia", "Diabetes", "Falls Risk"],
      lastContact: "2024-01-20",
      nextAppointment: "2024-02-22",
      priority: "urgent",
      status: "discharged",
      avatar: "RJ",
      careGaps: ["A1C overdue", "Fall risk assessment", "Caregiver support"],
      followUpRequired: true
    }
  ];

  const diabeticPatients = [
    {
      id: "P004",
      name: "Sarah Davis",
      age: 45,
      lastA1C: "2023-10-15",
      a1CValue: 8.2,
      overdue: true,
      avatar: "SD",
      nextAppointment: "2024-02-10"
    },
    {
      id: "P005",
      name: "Michael Brown",
      age: 52,
      lastA1C: "2024-01-10",
      a1CValue: 7.1,
      overdue: false,
      avatar: "MB",
      nextAppointment: "2024-03-15"
    },
    {
      id: "P006",
      name: "Lisa Wilson",
      age: 38,
      lastA1C: "2023-11-20",
      a1CValue: 9.4,
      overdue: true,
      avatar: "LW",
      nextAppointment: "2024-02-05"
    }
  ];

  const alerts = [
    {
      id: 1,
      type: "urgent",
      message: "3 high-risk patients discharged — schedule follow-ups",
      icon: AlertCircle,
      color: "text-red-600"
    },
    {
      id: 2,
      type: "warning",
      message: "Diabetic patients overdue for A1C testing",
      icon: Stethoscope,
      color: "text-yellow-600"
    },
    {
      id: 3,
      type: "info",
      message: "5 patients need medication reconciliation",
      icon: Pill,
      color: "text-blue-600"
    },
    {
      id: 4,
      type: "success",
      message: "All discharge summaries completed for today",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      id: 5,
      type: "info",
      message: "2 DME orders pending approval",
      icon: Accessibility,
      color: "text-blue-600"
    },
    {
      id: 6,
      type: "warning",
      message: "Home health referrals need follow-up",
      icon: HomeIcon,
      color: "text-yellow-600"
    }
  ];

  const tasks = [
    {
      id: 1,
      title: "High-risk patient outreach",
      count: 8,
      priority: "urgent",
      icon: Users
    },
    {
      id: 2,
      title: "Gap closure documentation",
      count: 12,
      priority: "high",
      icon: FileCheck
    },
    {
      id: 3,
      title: "Discharge coordination",
      count: 5,
      priority: "high",
      icon: Send
    },
    {
      id: 4,
      title: "DME orders",
      count: 3,
      priority: "medium",
      icon: Accessibility
    },
    {
      id: 5,
      title: "Home health referrals",
      count: 7,
      priority: "medium",
      icon: HomeIcon
    },
    {
      id: 6,
      title: "Medication reconciliation",
      count: 15,
      priority: "low",
      icon: Pill
    }
  ];

  // Message rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlertIndex((prevIndex) => 
        (prevIndex + 1) % alerts.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [alerts.length]);

  const currentAlert = alerts[currentAlertIndex];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRiskScoreColor = (score) => {
    if (score >= 0.9) return "text-red-600 bg-red-50";
    if (score >= 0.7) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  const formatShortCurrency = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    } else {
      return `$${amount}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-[#01213E] border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center">
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

            {/* Right: Quick Actions */}
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

      <div className="flex">
        {/* Left Navigation */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-6">
              <Stethoscope className="h-6 w-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Medical Staff</h2>
            </div>
            
            <nav className="space-y-2">
              <button
                onClick={() => setActiveSection("outreach")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === "outreach" 
                    ? "bg-blue-50 text-blue-700 border border-blue-200" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Users className="h-5 w-5" />
                <span className="font-medium">Prioritized Outreach</span>
              </button>
              
              <button
                onClick={() => setActiveSection("scheduling")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === "scheduling" 
                    ? "bg-blue-50 text-blue-700 border border-blue-200" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Scheduling</span>
              </button>
              
              <button
                onClick={() => setActiveSection("gaps")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === "gaps" 
                    ? "bg-blue-50 text-blue-700 border border-blue-200" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Target className="h-5 w-5" />
                <span className="font-medium">Gap Closure</span>
              </button>
              
              <button
                onClick={() => setActiveSection("discharge")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === "discharge" 
                    ? "bg-blue-50 text-blue-700 border border-blue-200" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Send className="h-5 w-5" />
                <span className="font-medium">Discharge Coordination</span>
              </button>
              
              <button
                onClick={() => setActiveSection("dme")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === "dme" 
                    ? "bg-blue-50 text-blue-700 border border-blue-200" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Accessibility className="h-5 w-5" />
                <span className="font-medium">DME & Home Health</span>
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
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </button>
          </div>

          {/* Content based on active section */}
          {activeSection === "outreach" && (
            <div className="space-y-6">
              {/* High-Risk Patients */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">High-Risk Patient Outreach</h2>
                  <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>Add Patient</span>
                  </button>
                </div>
                
                <div className="space-y-3">
                  {highRiskPatients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {patient.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{patient.name}</div>
                          <div className="text-sm text-gray-500">
                            Age: {patient.age} | Last Contact: {patient.lastContact}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            {patient.conditions.map((condition, idx) => (
                              <span key={idx} className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                {condition}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            {patient.careGaps.map((gap, idx) => (
                              <span key={idx} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                {gap}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(patient.priority)}`}>
                          {patient.priority}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskScoreColor(patient.riskScore)}`}>
                          Risk: {patient.riskScore}
                        </div>
                        {patient.followUpRequired && (
                          <div className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                            Follow-up Required
                          </div>
                        )}
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <Phone className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <MessageSquare className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diabetic Patients Overdue */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Diabetic Patients - A1C Overdue</h3>
                <div className="space-y-3">
                  {diabeticPatients.filter(p => p.overdue).map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {patient.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{patient.name}</div>
                          <div className="text-sm text-gray-500">
                            Last A1C: {patient.lastA1C} | Value: {patient.a1CValue}%
                          </div>
                          <div className="text-sm text-red-600 font-medium">
                            Overdue for A1C testing
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                          Schedule A1C
                        </button>
                        <button className="p-2 text-gray-400 hover:text-yellow-600 transition-colors">
                          <Phone className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "scheduling" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Scheduling</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Schedule New Appointment</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Patient</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>Select patient</option>
                          {highRiskPatients.map(patient => (
                            <option key={patient.id} value={patient.id}>{patient.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>Follow-up</option>
                          <option>Gap closure</option>
                          <option>Medication review</option>
                          <option>Care coordination</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                        <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
                    <div className="space-y-3">
                      <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium">View Calendar</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                        <Phone className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium">Call Patient</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                        <MessageSquare className="h-5 w-5 text-yellow-600" />
                        <span className="text-sm font-medium">Send SMS</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "gaps" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gap Closure Documentation</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <span className="font-medium text-gray-900">Critical Gaps</span>
                      </div>
                      <div className="text-2xl font-bold text-red-600">8</div>
                      <div className="text-sm text-gray-600">Require immediate attention</div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-gray-900">Overdue</span>
                      </div>
                      <div className="text-2xl font-bold text-yellow-600">12</div>
                      <div className="text-sm text-gray-600">Past due date</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-gray-900">Completed</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">24</div>
                      <div className="text-sm text-gray-600">This month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "discharge" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Discharge Coordination</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Concurrent Review</h4>
                        <p className="text-sm text-gray-600">3 patients ready for discharge planning</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Review Cases
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Discharge Summaries</h4>
                        <p className="text-sm text-gray-600">5 summaries completed today</p>
                      </div>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        View Summaries
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "dme" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">DME & Home Health Orders</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">DME Orders</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">Wheelchair - John Smith</div>
                            <div className="text-sm text-gray-600">Status: Pending Approval</div>
                          </div>
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">Oxygen Concentrator - Maria Garcia</div>
                            <div className="text-sm text-gray-600">Status: Approved</div>
                          </div>
                          <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Home Health Referrals</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">Skilled Nursing - Robert Johnson</div>
                            <div className="text-sm text-gray-600">Status: Pending</div>
                          </div>
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Send className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">Physical Therapy - Sarah Davis</div>
                            <div className="text-sm text-gray-600">Status: Scheduled</div>
                          </div>
                          <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                            <Calendar className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar with Tasks */}
        <div className="w-80 bg-white border-l border-gray-200 min-h-screen p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tasks & Alerts</h3>
          
          {/* Reactive Insights */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">System Alerts</h4>
            <div className="space-y-3">
              {alerts.slice(0, 3).map((alert) => (
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

          {/* Quick Stats */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Today's Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">High-risk patients</span>
                <span className="font-medium text-red-600">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Gap closures</span>
                <span className="font-medium text-green-600">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discharges</span>
                <span className="font-medium text-blue-600">5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">DME orders</span>
                <span className="font-medium text-yellow-600">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalStaffDashboard;
