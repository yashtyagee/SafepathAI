/**
 * DashboardLayout — Main application container shell with Dynamic Role-Based Access Control
 * 
 * Dynamically filters visible navigation items and operational controls
 * based on whether the logged-in user is a Citizen, Rescue Responder, or Authority.
 */

import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
  UserCheck,
  AlertTriangle,
  LogOut,
  Users,
  Radio,
  Building,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// Master Navigation Items with permitted roles
const ALL_NAVIGATION_ITEMS = [
  {
    name: 'Command Center',
    path: '/command-center',
    icon: LayoutDashboard,
    roles: ['authority'],
  },
  {
    name: 'Disaster Map',
    path: '/map',
    icon: MapIcon,
    roles: ['citizen', 'rescue', 'authority'],
  },
  {
    name: 'Rescue Operations',
    path: '/rescue-operations',
    icon: LifeBuoy,
    roles: ['rescue', 'authority'],
  },
  {
    name: 'Report Incident',
    path: '/report-incident',
    icon: FilePlus,
    roles: ['citizen', 'rescue', 'authority'],
  },
  {
    name: 'Route to Shelter',
    path: '/route-planner',
    icon: Navigation,
    roles: ['citizen', 'rescue', 'authority'],
  },
  {
    name: 'Risk Analytics',
    path: '/risk-analytics',
    icon: LineChart,
    roles: ['authority'],
  },
  {
    name: 'Hazard Detection',
    path: '/hazard-detection',
    icon: CheckCircle2,
    roles: ['rescue', 'authority'],
  },
  {
    name: 'AI Truth Engine',
    path: '/verification',
    icon: Shield,
    roles: ['authority'],
  },
]

export default function DashboardLayout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser, currentRole, loginAsRole, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
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

  // Filter navigation items by active role!
  const permittedNavItems = ALL_NAVIGATION_ITEMS.filter((item) =>
    item.roles.includes(currentRole)
  )

  const getRoleTheme = () => {
    if (currentRole === 'citizen') {
      return {
        badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        sidebarTag: 'Citizen Safety Portal',
        color: 'emerald',
      }
    }
    if (currentRole === 'rescue') {
      return {
        badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
        sidebarTag: 'Rescue Tactical Grid',
        color: 'amber',
      }
    }
    return {
      badgeBg: 'bg-primary-50 text-primary-700 border-primary-200',
      sidebarTag: 'Authority Command Console',
      color: 'primary',
    }
  }

  const roleTheme = getRoleTheme()

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

          {/* Active User Profile Pill */}
          <div className="p-4 border-b border-navy-800/80 bg-navy-950/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-navy-700 border border-navy-600 flex items-center justify-center text-xs font-bold text-white">
                {currentUser.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                <p className="text-[10px] text-navy-400 truncate">{currentUser.title}</p>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between text-[11px] pt-2 border-t border-navy-800/60">
              <span className="text-navy-400">Mode:</span>
              <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] uppercase bg-navy-800 text-primary-300 border border-navy-700">
                {currentRole}
              </span>
            </div>
          </div>

          {/* Role-Filtered Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-navy-400">
              {roleTheme.sidebarTag}
            </div>

            {permittedNavItems.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-sm font-semibold'
                      : 'text-navy-300 hover:text-white hover:bg-navy-800/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-navy-400'}`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-navy-800 text-xs text-navy-400 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Core Online
            </span>
            <Link
              to="/login"
              className="text-navy-400 hover:text-white flex items-center gap-1 text-[11px]"
            >
              <LogOut className="w-3 h-3" />
              Switch
            </Link>
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
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-navy-600 bg-navy-50 px-2.5 py-1 rounded-md border border-navy-100">
              <span className="w-2 h-2 rounded-full bg-primary-500"></span>
              <span>SafePath AI Protocol</span>
              <span className="text-navy-400">·</span>
              <span className="font-bold text-navy-800">{currentUser.department}</span>
            </div>
          </div>

          {/* Right Header Utilities & Live Quick Role Switcher */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* UTC Clock */}
            <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-navy-600 bg-navy-50/80 px-2.5 py-1 rounded border border-navy-100">
              <Clock className="w-3.5 h-3.5 text-navy-400" />
              <span>{currentTime}</span>
            </div>

            {/* Quick Role Switcher */}
            <div className="flex items-center gap-1.5 bg-navy-50 p-1 rounded-lg border border-navy-100 text-xs">
              <UserCheck className="w-3.5 h-3.5 text-primary-500 ml-1.5" />
              <select
                value={currentRole}
                onChange={(e) => {
                  loginAsRole(e.target.value)
                  // If citizen switches away from admin page, redirect to map
                  if (e.target.value === 'citizen' && ['/command-center', '/risk-analytics', '/verification'].includes(location.pathname)) {
                    navigate('/map')
                  }
                  if (e.target.value === 'rescue' && ['/command-center', '/risk-analytics', '/verification'].includes(location.pathname)) {
                    navigate('/rescue-operations')
                  }
                }}
                className="bg-transparent font-bold text-navy-900 outline-none pr-1 py-0.5 cursor-pointer"
              >
                <option value="citizen">👤 Citizen View</option>
                <option value="rescue">🚑 Rescue Team View</option>
                <option value="authority">🏛️ Authority View</option>
              </select>
            </div>

            {/* Sign Out / Change User */}
            <Link
              to="/login"
              className="px-2.5 py-1 text-xs font-semibold text-navy-700 hover:text-primary-600 hover:bg-navy-50 rounded-md border border-navy-200 transition"
            >
              Sign In
            </Link>
          </div>
        </header>

        {/* Role-Specific Alert Banner */}
        {currentRole === 'citizen' && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-1.5 text-xs text-emerald-900 flex items-center justify-between">
            <span>
              <strong>Citizen Emergency Portal:</strong> Access live verified shelters, safe evacuation routes, and report ground incidents.
            </span>
            <span className="hidden sm:inline font-bold text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              PUBLIC SAFE ACCESS
            </span>
          </div>
        )}

        {currentRole === 'rescue' && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-1.5 text-xs text-amber-900 flex items-center justify-between">
            <span>
              <strong>Rescue Responder Mode:</strong> Prioritized triage queue and unit deployment channels are active.
            </span>
            <span className="hidden sm:inline font-bold text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
              NDRF DISPATCH LINKED
            </span>
          </div>
        )}

        {currentRole === 'authority' && (
          <div className="bg-primary-50 border-b border-primary-200 px-4 py-1.5 text-xs text-primary-900 flex items-center justify-between">
            <span>
              <strong>Authority Command Mode:</strong> Full administrative privileges, ML model telemetry, and AI Truth Engine controls enabled.
            </span>
            <span className="hidden sm:inline font-bold text-[10px] text-primary-700 bg-primary-100 px-2 py-0.5 rounded">
              FULL CLEARANCE
            </span>
          </div>
        )}

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
