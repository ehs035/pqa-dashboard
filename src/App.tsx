import './App.css'
import { useState } from 'react'
import MedicalProviderDashboard from './pages/MedicalProviderDashboard'
import PQADashboard from './pages/PQADashboard'
import PCPDashboard from './pages/PCPDashboard'

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'medical' | 'pqa' | 'pcp'>('home')

  if (currentView === 'medical') {
    return <MedicalProviderDashboard />
  }

  if (currentView === 'pqa') {
    return <PQADashboard />
  }

  if (currentView === 'pcp') {
    return <PCPDashboard />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PQA Portal Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Choose a dashboard to view provider performance and quality metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Medical Provider Dashboard */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Medical Provider Dashboard
              </h2>
              <p className="text-gray-600 mb-6">
                Track earning opportunities, quality scores, and program performance for individual providers
              </p>
              <button
                onClick={() => setCurrentView('medical')}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View Provider Dashboard
              </button>
            </div>
          </div>

          {/* PQA Dashboard */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                PQA Dashboard
              </h2>
              <p className="text-gray-600 mb-6">
                Monitor global quality metrics, peer benchmarking, and comprehensive P4P analytics
              </p>
              <button
                onClick={() => setCurrentView('pqa')}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                View PQA Dashboard
              </button>
            </div>
          </div>

          {/* PCP Dashboard */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                PCP Dashboard
              </h2>
              <p className="text-gray-600 mb-6">
                Primary Care Provider portal with patient management, care coordination, and quality tracking
              </p>
              <button
                onClick={() => setCurrentView('pcp')}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                View PCP Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Back button for when viewing dashboards */}
        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentView('home')}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
