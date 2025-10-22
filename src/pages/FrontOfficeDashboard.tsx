import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Users,
  UserPlus,
  CreditCard,
  FileText,
  Phone,
  Video,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronDown,
  Bell,
  Search,
  Filter,
  Settings,
  Plus,
  Eye,
  Edit,
  Send,
  Download,
  Home,
  DollarSign,
  Shield,
  MessageSquare,
  ClipboardList,
  Activity,
  UserCheck,
  FileCheck,
  Target,
  Zap,
  X,
  Save,
  Share2,
  PieChart,
  BarChart,
  LineChart,
  DollarSign as DollarSignIcon,
  ArrowLeft
} from "lucide-react";

const FrontOfficeDashboard = () => {
  const [activeSection, setActiveSection] = useState("calendar");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isProviderDropdownOpen, setIsProviderDropdownOpen] = useState(false);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [isWidgetDialogOpen, setIsWidgetDialogOpen] = useState(false);
  const [customWidgets, setCustomWidgets] = useState([]);
  const [activeWidgetTab, setActiveWidgetTab] = useState('general');

  // Mock data for Front Office
  const appointments = [
    {
      id: 1,
      time: "09:00 AM",
      patient: "John Smith",
      type: "Follow-up",
      status: "confirmed",
      copay: 25,
      deductible: 150,
      eligibility: "verified",
      provider: "Dr. Johnson"
    },
    {
      id: 2,
      time: "09:30 AM",
      patient: "Sarah Davis",
      type: "New Patient",
      status: "pending",
      copay: 50,
      deductible: 300,
      eligibility: "pending",
      provider: "Dr. Chen"
    },
    {
      id: 3,
      time: "10:00 AM",
      patient: "Mike Wilson",
      type: "Telehealth",
      status: "confirmed",
      copay: 0,
      deductible: 0,
      eligibility: "verified",
      provider: "Dr. Rodriguez"
    },
    {
      id: 4,
      time: "10:30 AM",
      patient: "Lisa Brown",
      type: "Consultation",
      status: "no-show",
      copay: 75,
      deductible: 500,
      eligibility: "verified",
      provider: "Dr. Johnson"
    },
    {
      id: 5,
      time: "11:00 AM",
      patient: "David Lee",
      type: "Procedure",
      status: "confirmed",
      copay: 100,
      deductible: 200,
      eligibility: "verified",
      provider: "Dr. Chen"
    }
  ];

  const waitlist = [
    {
      id: 1,
      patient: "Emma Thompson",
      preferredTime: "2:00 PM",
      reason: "Urgent follow-up",
      priority: "high"
    },
    {
      id: 2,
      patient: "Robert Garcia",
      preferredTime: "3:30 PM",
      reason: "Routine checkup",
      priority: "medium"
    },
    {
      id: 3,
      patient: "Maria Lopez",
      preferredTime: "4:00 PM",
      reason: "Insurance verification needed",
      priority: "low"
    }
  ];

  const alerts = [
    {
      id: 1,
      type: "urgent",
      message: "PA pending for tomorrow's MRI — follow-up required",
      icon: AlertCircle,
      color: "text-red-600"
    },
    {
      id: 2,
      type: "warning",
      message: "4 no-shows today — send SMS rescheduling links",
      icon: MessageSquare,
      color: "text-yellow-600"
    },
    {
      id: 3,
      type: "info",
      message: "3 patients added to waitlist this morning",
      icon: Users,
      color: "text-blue-600"
    },
    {
      id: 4,
      type: "success",
      message: "All eligibility verifications completed for today",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      id: 5,
      type: "info",
      message: "Telehealth setup completed for 2 patients",
      icon: Video,
      color: "text-blue-600"
    },
    {
      id: 6,
      type: "warning",
      message: "Payment processing delayed for 1 patient",
      icon: CreditCard,
      color: "text-yellow-600"
    }
  ];

  const tasks = [
    {
      id: 1,
      title: "Eligibility verifications",
      count: 8,
      priority: "high",
      icon: Shield
    },
    {
      id: 2,
      title: "Copay calculations",
      count: 12,
      priority: "medium",
      icon: DollarSign
    },
    {
      id: 3,
      title: "Telehealth setups",
      count: 3,
      priority: "medium",
      icon: Video
    },
    {
      id: 4,
      title: "Receipt generation",
      count: 15,
      priority: "low",
      icon: FileText
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'no-show': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatCurrency = (amount) => {
    return `$${amount}`;
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
              <Home className="h-6 w-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Front Office</h2>
            </div>
            
            <nav className="space-y-2">
              <button
                onClick={() => setActiveSection("calendar")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === "calendar" 
                    ? "bg-blue-50 text-blue-700 border border-blue-200" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Appointments</span>
              </button>
              
              <button
                onClick={() => setActiveSection("registration")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === "registration" 
                    ? "bg-blue-50 text-blue-700 border border-blue-200" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <UserPlus className="h-5 w-5" />
                <span className="font-medium">Registration</span>
              </button>
              
              <button
                onClick={() => setActiveSection("eligibility")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === "eligibility" 
                    ? "bg-blue-50 text-blue-700 border border-blue-200" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Shield className="h-5 w-5" />
                <span className="font-medium">Eligibility</span>
              </button>
              
              <button
                onClick={() => setActiveSection("payments")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === "payments" 
                    ? "bg-blue-50 text-blue-700 border border-blue-200" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <CreditCard className="h-5 w-5" />
                <span className="font-medium">Payments</span>
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
          {activeSection === "calendar" && (
            <div className="space-y-6">
              {/* Appointment Calendar Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Today's Appointments</h2>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600">
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus className="h-4 w-4" />
                      <span>New Appointment</span>
                    </button>
                  </div>
                </div>
                
                {/* Appointments List */}
                <div className="space-y-3">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {appointment.time}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{appointment.patient}</div>
                          <div className="text-sm text-gray-500">
                            {appointment.type} • {appointment.provider}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              appointment.eligibility === 'verified' ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50'
                            }`}>
                              {appointment.eligibility}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            Copay: {formatCurrency(appointment.copay)}
                          </div>
                          <div className="text-xs text-gray-500">
                            Deductible: {formatCurrency(appointment.deductible)}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          {appointment.type === 'Telehealth' && (
                            <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                              <Video className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Waitlist Management */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Waitlist Management</h3>
                <div className="space-y-3">
                  {waitlist.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Clock className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{patient.patient}</div>
                          <div className="text-sm text-gray-500">
                            Preferred: {patient.preferredTime} • {patient.reason}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(patient.priority)}`}>
                          {patient.priority}
                        </span>
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Send className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "registration" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Registration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter patient name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Provider</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>Select insurance provider</option>
                        <option>Blue Cross Blue Shield</option>
                        <option>Aetna</option>
                        <option>Cigna</option>
                        <option>UnitedHealth</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Policy Number</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter policy number" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="(555) 123-4567" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="patient@email.com" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Register Patient
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "eligibility" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Eligibility Verification</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">John Smith - Verified</div>
                      <div className="text-sm text-gray-600">Active coverage • Copay: $25 • Deductible: $150 remaining</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                    <div>
                      <div className="font-medium text-gray-900">Sarah Davis - Pending</div>
                      <div className="text-sm text-gray-600">Verification in progress • Estimated copay: $50</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg">
                    <XCircle className="h-6 w-6 text-red-600" />
                    <div>
                      <div className="font-medium text-gray-900">Mike Wilson - Coverage Expired</div>
                      <div className="text-sm text-gray-600">Coverage ended 12/31/2023 • Contact patient for new insurance</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "payments" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Processing</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-gray-900">Today's Revenue</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">$1,250</div>
                    <div className="text-sm text-gray-600">From 8 appointments</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-gray-900">Paid Today</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">$850</div>
                    <div className="text-sm text-gray-600">68% collection rate</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium text-gray-900">Pending</span>
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">$400</div>
                    <div className="text-sm text-gray-600">3 payments pending</div>
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
                <span className="text-gray-600">Appointments</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">No Shows</span>
                <span className="font-medium text-red-600">1</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Waitlist</span>
                <span className="font-medium text-yellow-600">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Revenue</span>
                <span className="font-medium text-green-600">$1,250</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontOfficeDashboard;
