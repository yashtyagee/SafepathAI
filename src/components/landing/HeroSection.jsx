/**
 * HeroSection — split-layout hero for the SafePath AI landing page.
 *
 * Left side:  Headline, subtitle, description, live-stat badges, CTA buttons
 * Right side: Interactive Leaflet map preview showing India with sample markers
 *
 * The map is a real Leaflet map (not an image), giving an immediate
 * demonstration of SafePath AI's geographic capabilities.
 */

import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Radio,
  ShieldCheck,
  MapPin,
  Activity,
} from 'lucide-react'
import MapPreviewMini from './MapPreviewMini'

const HERO_STATS = [
  { icon: Radio, label: 'Real-time Monitoring', color: 'text-danger-500' },
  { icon: ShieldCheck, label: 'AI Verification', color: 'text-success-500' },
  { icon: MapPin, label: 'Hazard-Aware Routing', color: 'text-primary-500' },
  { icon: Activity, label: 'Rescue Prioritization', color: 'text-warning-500' },
]

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/60 via-white to-info-50/40 -z-10" />
      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-info-50/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ---- LEFT COLUMN: Text Content ---- */}
          <div className="space-y-8">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[var(--radius-badge)] bg-primary-50 border border-primary-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success-500" />
              </span>
              <span className="text-xs font-semibold text-primary-700 tracking-wide uppercase">
                AI-Powered Disaster Intelligence
              </span>
            </div>

            {/* Main headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-navy-900 leading-[1.1] tracking-tight">
                Predict. Detect.
                <br />
                <span className="text-primary-500">Protect Lives.</span>
              </h1>
              <p className="mt-5 text-lg sm:text-xl text-navy-500 leading-relaxed max-w-xl">
                SafePath AI integrates satellite data, environmental sensors,
                citizen reports, and machine learning to deliver real-time
                disaster risk assessment and emergency response intelligence.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/map"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-[var(--radius-button)] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Explore Live Map
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/report-incident"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-primary-600 bg-white border-2 border-primary-200 hover:border-primary-400 hover:bg-primary-50 rounded-[var(--radius-button)] transition-all duration-200"
              >
                Report Incident
              </Link>
            </div>

            {/* Capability badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/70 border border-navy-100"
                >
                  <stat.icon className={`w-4.5 h-4.5 ${stat.color} shrink-0`} />
                  <span className="text-sm font-medium text-navy-700">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ---- RIGHT COLUMN: Map Preview ---- */}
          <div className="relative">
            {/* Glow behind the map */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary-200/40 to-info-200/40 rounded-[1.5rem] blur-2xl -z-10" />

            <div className="relative bg-white rounded-[var(--radius-card)] shadow-xl border border-navy-100 overflow-hidden">
              {/* Map header bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-navy-900 text-white">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-danger-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-warning-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-success-500" />
                  </div>
                  <span className="text-xs font-medium text-navy-300 ml-2">
                    SafePath AI — Disaster Intelligence Map
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success-400" />
                  </span>
                  <span className="text-xs text-success-400 font-medium">LIVE</span>
                </div>
              </div>

              {/* Actual Leaflet map */}
              <div className="h-[400px] lg:h-[460px]">
                <MapPreviewMini />
              </div>

              {/* Map footer stats */}
              <div className="grid grid-cols-3 divide-x divide-navy-100 border-t border-navy-100 bg-navy-50/50">
                <div className="px-3 py-2.5 text-center">
                  <p className="text-xs text-navy-400 font-medium">Active Alerts</p>
                  <p className="text-lg font-bold text-danger-500">—</p>
                </div>
                <div className="px-3 py-2.5 text-center">
                  <p className="text-xs text-navy-400 font-medium">Monitored Zones</p>
                  <p className="text-lg font-bold text-primary-500">—</p>
                </div>
                <div className="px-3 py-2.5 text-center">
                  <p className="text-xs text-navy-400 font-medium">Risk Level</p>
                  <p className="text-lg font-bold text-warning-500">—</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
