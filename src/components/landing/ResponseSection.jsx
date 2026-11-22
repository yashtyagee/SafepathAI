/**
 * ResponseSection — previews the emergency response dashboard
 * capabilities with role-based cards (Citizen, Rescue, Authority).
 *
 * Section id="response" enables smooth-scroll from navbar.
 */

import {
  Users,
  Radio,
  BarChart3,
  MapPin,
  FileText,
  Bell,
} from 'lucide-react'

const ROLES = [
  {
    icon: Users,
    title: 'For Citizens',
    color: 'bg-primary-50 text-primary-500 border-primary-100',
    capabilities: [
      { icon: MapPin, text: 'View hazard map and risk zones' },
      { icon: FileText, text: 'Submit disaster reports with evidence' },
      { icon: Bell, text: 'Get route guidance to safe shelters' },
    ],
  },
  {
    icon: Radio,
    title: 'For Rescue Teams',
    color: 'bg-danger-50 text-danger-500 border-red-100',
    capabilities: [
      { icon: Bell, text: 'Receive priority-ranked emergencies' },
      { icon: MapPin, text: 'View affected roads and safe routes' },
      { icon: FileText, text: 'Inspect AI-verified report evidence' },
    ],
  },
  {
    icon: BarChart3,
    title: 'For Authorities',
    color: 'bg-warning-50 text-warning-500 border-amber-100',
    capabilities: [
      { icon: BarChart3, text: 'Monitor consolidated dashboards' },
      { icon: MapPin, text: 'Track incident distribution patterns' },
      { icon: FileText, text: 'Review shelter and resource status' },
    ],
  },
]

function ResponseSection() {
  return (
    <section id="response" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary-600 bg-primary-50 rounded-[var(--radius-badge)] mb-4">
            Role-Based Access
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
            Intelligence for Every Responder
          </h2>
          <p className="text-lg text-navy-500 leading-relaxed">
            Three tailored interfaces ensure citizens, rescue teams, and
            authorities each see the information most relevant to their role.
          </p>
        </div>

        {/* Role cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {ROLES.map((role) => (
            <div
              key={role.title}
              className={`rounded-[var(--radius-card)] border ${role.color.split(' ')[2]} bg-white shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
            >
              {/* Card header */}
              <div className={`flex items-center gap-3 px-6 pt-6 pb-4`}>
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${role.color.split(' ').slice(0, 2).join(' ')}`}
                >
                  <role.icon className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-lg font-semibold text-navy-900">
                  {role.title}
                </h3>
              </div>

              {/* Capabilities list */}
              <div className="px-6 pb-6 space-y-3">
                {role.capabilities.map((cap) => (
                  <div
                    key={cap.text}
                    className="flex items-start gap-3 p-3 bg-navy-50/50 rounded-lg"
                  >
                    <cap.icon className="w-4.5 h-4.5 text-navy-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-navy-600 leading-snug">
                      {cap.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ResponseSection
