/**
 * Login — Role-Based Authentication Portal
 * 
 * Provides:
 * - Credentials input (simulated JWT authentication)
 * - 1-Click Persona Quick Logins for Evaluators & Demonstrations:
 *   1. Citizen (Rahul Sharma)
 *   2. Rescue Responder (Capt. Vikram Singh, NDRF)
 *   3. Disaster Authority Lead (Dr. Anita Verma, NDMA)
 */

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Shield,
  UserCheck,
  LifeBuoy,
  Building2,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { loginAsRole, DEFAULT_USERS } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState('authority')

  const handleManualLogin = (e) => {
    e.preventDefault()
    loginAsRole(selectedRole)
    if (selectedRole === 'citizen') navigate('/map')
    else if (selectedRole === 'rescue') navigate('/rescue-operations')
    else navigate('/command-center')
  }

  const handleQuickPersona = (roleKey) => {
    loginAsRole(roleKey)
    if (roleKey === 'citizen') navigate('/map')
    else if (roleKey === 'rescue') navigate('/rescue-operations')
    else navigate('/command-center')
  }

  return (
    <div className="min-h-screen bg-navy-50/50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
          <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white shadow-md group-hover:bg-primary-600 transition">
            <Shield className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-navy-900 tracking-tight">
            SafePath <span className="text-primary-500">AI</span>
          </span>
        </Link>
        <h2 className="text-xl font-bold text-navy-900">
          Sign In to Emergency Intelligence Network
        </h2>
        <p className="mt-1 text-xs text-navy-500">
          Role-Based Access Control for Citizens, Responders &amp; Authorities
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-navy-100 sm:px-10 space-y-6">
          {/* Quick Demo Personas Box (Crucial for Viva & Exam Demo) */}
          <div className="bg-navy-50/70 p-4 rounded-xl border border-navy-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-navy-800 uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-primary-500" />
                Select Persona (1-Click Viva Demo)
              </span>
              <span className="text-[10px] text-primary-600 font-semibold bg-primary-50 px-2 py-0.5 rounded border border-primary-200">
                RECOMMENDED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Persona 1: Citizen */}
              <button
                type="button"
                onClick={() => handleQuickPersona('citizen')}
                className="p-3 bg-white rounded-lg border border-navy-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition group shadow-xs"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    👤
                  </div>
                  <strong className="text-xs text-navy-900 block group-hover:text-emerald-700">
                    Citizen
                  </strong>
                </div>
                <p className="text-[10px] text-navy-500 leading-tight">
                  {DEFAULT_USERS.citizen.name} (Public Map, Report Hazard, Shelters)
                </p>
              </button>

              {/* Persona 2: Rescue Lead */}
              <button
                type="button"
                onClick={() => handleQuickPersona('rescue')}
                className="p-3 bg-white rounded-lg border border-navy-200 hover:border-amber-500 hover:bg-amber-50/40 text-left transition group shadow-xs"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                    🚑
                  </div>
                  <strong className="text-xs text-navy-900 block group-hover:text-amber-700">
                    Rescue Team
                  </strong>
                </div>
                <p className="text-[10px] text-navy-500 leading-tight">
                  {DEFAULT_USERS.rescue.name} (Priority Dispatch, NDRF Units)
                </p>
              </button>

              {/* Persona 3: Authority Director */}
              <button
                type="button"
                onClick={() => handleQuickPersona('authority')}
                className="p-3 bg-white rounded-lg border border-navy-200 hover:border-primary-500 hover:bg-primary-50/40 text-left transition group shadow-xs"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                    🏛️
                  </div>
                  <strong className="text-xs text-navy-900 block group-hover:text-primary-700">
                    Authority
                  </strong>
                </div>
                <p className="text-[10px] text-navy-500 leading-tight">
                  {DEFAULT_USERS.authority.name} (Command Center, AI Truth Models)
                </p>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-navy-100"></div>
            <span className="flex-shrink mx-4 text-xs font-semibold text-navy-400 uppercase">
              Or Custom Sign In
            </span>
            <div className="flex-grow border-t border-navy-100"></div>
          </div>

          {/* Traditional Form */}
          <form onSubmit={handleManualLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1">
                Access Role Clearance
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-navy-200 bg-white font-medium text-navy-900"
              >
                <option value="citizen">Citizen / Resident Clearance</option>
                <option value="rescue">Rescue Responder / NDRF Tactical</option>
                <option value="authority">Disaster Management Authority Lead</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1">
                Authorized Identifier / Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-navy-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="responder@safepath.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-navy-200 rounded-lg focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1">
                Security Passcode
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-navy-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-navy-200 rounded-lg focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-xs font-bold transition shadow-sm flex items-center justify-center gap-2"
            >
              <span>Authenticate &amp; Enter Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Bottom Security Note */}
          <div className="text-[11px] text-navy-400 text-center border-t border-navy-50 pt-3">
            Protected under Emergency Data Encryption Protocols. Unauthorized access to authority operations is logged.
          </div>
        </div>
      </div>
    </div>
  )
}
