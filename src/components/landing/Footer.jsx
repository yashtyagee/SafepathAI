/**
 * Footer — site-wide footer with navigation links,
 * project info, and a disclaimer.
 */

import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

const FOOTER_LINKS = {
  Platform: [
    { label: 'Live Map', to: '/map' },
    { label: 'Command Center', to: '/command-center' },
    { label: 'Report Incident', to: '/report-incident' },
    { label: 'Route Planner', to: '/route-planner' },
  ],
  Intelligence: [
    { label: 'Risk Analytics', to: '/risk-analytics' },
    { label: 'Verification', to: '/verification' },
    { label: 'Rescue Operations', to: '/rescue-operations' },
  ],
  Resources: [
    { label: 'Documentation', to: '#' },
    { label: 'API Reference', to: '#' },
    { label: 'Data Sources', to: '#' },
  ],
}

function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 py-14 lg:py-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-primary-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">
                SafePath <span className="text-primary-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-navy-400 leading-relaxed max-w-sm mb-6">
              Intelligent Disaster Prediction &amp; Emergency Response System.
              Integrating satellite data, AI models, and citizen intelligence
              for safer communities.
            </p>
            <p className="text-xs text-navy-500">
              B.Tech CSE Final Year Project
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-navy-300 uppercase tracking-wider mb-4">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-navy-400 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-700/50 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-500">
            © 2024 SafePath AI. Academic research prototype — not a substitute
            for official emergency services.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-navy-500">
              Data: NASA IMERG · NASA FIRMS · OpenStreetMap
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
