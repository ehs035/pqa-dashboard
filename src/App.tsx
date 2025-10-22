import './App.css'
import { useState } from 'react'
import MedicalProviderDashboard from './pages/MedicalProviderDashboard'
import PQADashboard from './pages/PQADashboard'
import PCPDashboard from './pages/PCPDashboard'
import FrontOfficeDashboard from './pages/FrontOfficeDashboard'
import MedicalStaffDashboard from './pages/MedicalStaffDashboard'
import { Search, Bell, Settings, Filter } from 'lucide-react'

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'medical' | 'pqa' | 'pcp' | 'frontoffice' | 'medicalstaff'>('home')

  if (currentView === 'medical') {
    return <MedicalProviderDashboard />
  }

  if (currentView === 'pqa') {
    return <PQADashboard />
  }

  if (currentView === 'pcp') {
    return <PCPDashboard />
  }

  if (currentView === 'frontoffice') {
    return <FrontOfficeDashboard />
  }

  if (currentView === 'medicalstaff') {
    return <MedicalStaffDashboard />
  }

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

            {/* Center: Empty for now */}
            <div className="flex-1"></div>

            {/* Right: Quick Actions */}
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-300 hover:text-white transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-300 hover:text-white transition-colors">
                <Filter className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-300 hover:text-white transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <div className="relative">
                <button className="p-2 text-gray-300 hover:text-white transition-colors">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  5
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center relative" style={{ height: 'calc(100vh - 83px)' }}>
        {/* Background Astronaut Image */}
        <div className="absolute bottom-0 right-0 z-0">
          <img 
            src="/3800_2_06.png" 
            alt="Astronaut in space" 
            className="h-[50vh] w-auto"
          />
        </div>
        
        <div className="max-w-4xl mx-auto p-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              User-Centric Portal Variations
            </h1>
            <p className="text-xl text-gray-600">
              Persona-aware dashboards auto-configured by role, specialty, contract status and location
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* PCP Dashboard */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow flex flex-col">
            <div className="text-center flex-1 flex flex-col">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                PCP Dashboard
              </h2>
              <p className="text-gray-600 mb-6 flex-1">
                Primary Care Provider portal with patient management, care coordination, and quality tracking
              </p>
              <button
                onClick={() => setCurrentView('pcp')}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                View
              </button>
            </div>
          </div>

          {/* Front Office Dashboard */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow flex flex-col">
            <div className="text-center flex-1 flex flex-col">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Front Office
              </h2>
              <p className="text-gray-600 mb-6 flex-1">
                Appointment calendar, patient registration, eligibility verification, and payment processing
              </p>
              <button
                onClick={() => setCurrentView('frontoffice')}
                className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                View
              </button>
            </div>
          </div>

          {/* Medical Staff Dashboard */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow flex flex-col">
            <div className="text-center flex-1 flex flex-col">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Medical Staff
              </h2>
              <p className="text-gray-600 mb-6 flex-1">
                Task-oriented design for RNs and Care Coordinators with prioritized outreach and gap closure
              </p>
              <button
                onClick={() => setCurrentView('medicalstaff')}
                className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
              >
                View
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default App
