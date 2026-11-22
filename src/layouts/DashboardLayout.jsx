/**
 * DashboardLayout — Main application container shell
 * 
 * Provides:
 * - Persistent operational sidebar with route badges
 * - Top control header with live simulated clock, system status, and role switcher (Citizen, Rescue, Authority)
 * - Safe banner notifying users of simulated data
 * - Responsive mobile drawer toggle
 */

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Shield,
  LayoutDashboard,
  Map as MapIcon,
  LineChart,
  FilePlus,
  CheckCircle2,
  Navigation,
  LifeBuoy,
  Menu,
  X,
  Bell,
  Clock,
  ChevronDown,
  UserCheck,
  AlertTriangle,
} from 'lucide-react'

const NAVIGATION_ITEMS = [
  { name: 'Command Center', path: '/command-center', icon: LayoutDashboard },
  { name: 'Disaster Map', path: '/map', icon: MapIcon },
  { name: 'Risk Analytics', path: '/risk-analytics', icon: LineChart },
  { name: 'Report Incident', path: '/report-incident', icon: FilePlus },
  { name: 'AI Truth Engine', path: '/verification', icon: CheckCircle2 },
  { name: 'Route Planner', path: '/route-planner', icon: Navigation },
  { name: 'Rescue Operations', path: '/rescue-operations', icon: LifeBuoy },
]

export default function DashboardLayout({ children }) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState('Authority') // 'Citizen' | 'Rescue' | 'Authority'
  const [currentTime, setCurrentTime] = useState('')

  // Simulated operational clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-screen bg-navy-50/50 font-sans antialiased overflow-hidden">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy-900 text-white flex flex-col justify-between transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="h-16 flex items-center justify-between px-5 border-b border-navy-800">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white shadow-sm">
                <Shield className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="font-bold text-base tracking-tight text-white">SafePath</span>
                <span className="text-primary-400 font-bold ml-1">AI</span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-navy-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Mode Tag */}
          <div className="px-5 py-3 border-b border-navy-800/60 bg-navy-950/40">
            <div className="flex items-center justify-between text-xs">
              <span className="text-navy-400 font-medium">Active Interface:</span>
              <span className="px-2 py-0.5 rounded font-semibold text-primary-300 bg-primary-950/80 border border-primary-800/40">
                {currentRole} Console
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-sm font-semibold'
                      : 'text-navy-300 hover:text-white hover:bg-navy-800/70'
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : 'text-navy-400'}`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-navy-800 text-xs text-navy-400 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI Inference Engine: Online</span>
          </div>
          <div className="text-[11px] text-navy-400/80">
            Pretrained Transfer Models Ready
          </div>
        </div>
      </aside>

      {/* --- MAIN APP COLUMN --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-navy-100 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-navy-600 hover:text-navy-900 rounded-lg hover:bg-navy-50"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-navy-500 uppercase tracking-wider bg-navy-50 px-2.5 py-1 rounded-md border border-navy-100">
              <span className="w-2 h-2 rounded-full bg-primary-500"></span>
              Emergency Management Protocol 1.0
            </div>
          </div>

          {/* Right Header Utilities */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* UTC Clock */}
            <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-navy-600 bg-navy-50/80 px-2.5 py-1 rounded border border-navy-100">
              <Clock className="w-3.5 h-3.5 text-navy-400" />
              <span>{currentTime}</span>
            </div>

            {/* Role Switcher Selector */}
            <div className="flex items-center gap-1.5 bg-navy-50 p-1 rounded-lg border border-navy-100 text-xs">
              <UserCheck className="w-3.5 h-3.5 text-primary-500 ml-1.5" />
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                className="bg-transparent font-semibold text-navy-800 outline-none pr-1 py-0.5 cursor-pointer"
              >
                <option value="Authority">Authority View</option>
                <option value="Rescue">Rescue Team View</option>
                <option value="Citizen">Citizen View</option>
              </select>
            </div>

            {/* Alert Bell */}
            <div className="relative">
              <button
                title="Active Critical Alerts"
                className="p-2 text-navy-600 hover:text-navy-900 hover:bg-navy-50 rounded-lg relative"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full"></span>
              </button>
            </div>

            {/* Back to Home Portal */}
            <Link
              to="/"
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 hover:underline px-2"
            >
              Public Portal
            </Link>
          </div>
        </header>

        {/* Synthetic Data Disclaimer Banner */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-1.5 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              <strong>Simulated Environment:</strong> Emergency records, hazard regions, and AI confidence values are synthetic demonstration datasets.
            </span>
          </div>
          <span className="hidden sm:inline font-mono text-[10px] text-amber-700 bg-amber-100/80 px-1.5 py-0.5 rounded">
            DATA: SYNTHETIC-V1
          </span>
        </div>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
