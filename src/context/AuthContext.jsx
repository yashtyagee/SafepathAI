/**
 * AuthContext — Role-Based Access Control (RBAC) State
 * 
 * Supports 3 distinct operational roles:
 * 1. 'citizen'   — Simplified public disaster safety & reporting
 * 2. 'rescue'    — Ground tactical response, triage queue & dispatch
 * 3. 'authority' — Full strategic command, ML models & system controls
 */

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const DEFAULT_USERS = {
  citizen: {
    id: 'USR-CIT-01',
    name: 'Rahul Sharma',
    role: 'citizen',
    title: 'Registered Citizen / Resident',
    badge: 'Civilian User',
    department: 'Delhi NCR Region',
  },
  rescue: {
    id: 'USR-RES-04',
    name: 'Capt. Vikram Singh',
    role: 'rescue',
    title: 'NDRF Tactical Response Commander',
    badge: 'NDRF Unit 04',
    department: 'National Disaster Response Force',
  },
  authority: {
    id: 'USR-AUTH-01',
    name: 'Dr. Anita Verma',
    role: 'authority',
    title: 'Chief Disaster Intelligence Director',
    badge: 'State Authority Lead',
    department: 'National Disaster Management Authority (NDMA)',
  },
}

export function AuthProvider({ children }) {
  // Check localStorage or default to authority
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('safepath_user_role')
    return DEFAULT_USERS[saved] || DEFAULT_USERS.authority
  })

  const loginAsRole = (roleKey) => {
    const user = DEFAULT_USERS[roleKey] || DEFAULT_USERS.authority
    setCurrentUser(user)
    localStorage.setItem('safepath_user_role', roleKey)
  }

  const logout = () => {
    setCurrentUser(DEFAULT_USERS.citizen)
    localStorage.setItem('safepath_user_role', 'citizen')
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole: currentUser.role,
        loginAsRole,
        logout,
        DEFAULT_USERS,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
