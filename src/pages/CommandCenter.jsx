/**
 * CommandCenter — The core operational disaster intelligence view
 *
 * Provides authorities and response teams with a consolidated overview of:
 * - Real-time disaster risk KPIs
 * - Live interactive hazard map
 * - Incident triage and priority dispatch feed
 * - AI Truth Engine confidence inspector
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import DashboardLayout from '../layouts/DashboardLayout'
import {
  REGIONAL_RISK_SUMMARY,
  SIMULATED_INCIDENTS,
  SIMULATED_SHELTERS,
} from '../constants/mockData'
import {
  AlertCircle,
  ShieldCheck,
  Building2,
  AlertTriangle,
  Flame,
  Droplets,
  Mountain,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Filter,
  Eye,
} from 'lucide-react'

export default function CommandCenter() {
  const [filterType, setFilterType] = useState('ALL')
  const [selectedIncident, setSelectedIncident] = useState(SIMULATED_INCIDENTS[0])

  // Filtered incidents
  const filteredIncidents = SIMULATED_INCIDENTS.filter((item) => {
    if (filterType === 'ALL') return true
    return item.type.toLowerCase().includes(filterType.toLowerCase())
  })

  // Color generator by severity
  const getSeverityBadge = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-50 text-red-700 border-red-200'
      case 'high':
        return 'bg-orange-50 text-orange-700 border-orange-200'
      case 'moderate':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200'
    }
  }

  const getTypeIcon = (type) => {
    if (type.includes('Fire')) return <Flame className="w-4 h-4 text-orange-500" />
    if (type.includes('Flood') || type.includes('Water'))
      return <Droplets className="w-4 h-4 text-blue-500" />
    if (type.includes('Landslide'))
      return <Mountain className="w-4 h-4 text-amber-600" />
    return <AlertCircle className="w-4 h-4 text-red-500" />
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-navy-900 tracking-tight">
              Operational Command Center
            </h1>
            <p className="text-sm text-navy-500 mt-0.5">
              Consolidated real-time disaster surveillance &amp; rapid response coordination.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/report-incident"
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition shadow-sm inline-flex items-center gap-1.5"
            >
              Log Emergency Incident
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* --- KPI STAT CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Active Incidents */}
          <div className="bg-white p-5 rounded-xl border border-navy-100 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-navy-500 uppercase tracking-wider">
                Active Incidents
              </span>
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-navy-900">
                {REGIONAL_RISK_SUMMARY.activeIncidents}
              </span>
              <span className="text-xs font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                2 Critical
              </span>
            </div>
            <p className="text-xs text-navy-400 mt-2">Across 4 monitored urban corridors</p>
          </div>

          {/* Card 2: High Risk Zones */}
          <div className="bg-white p-5 rounded-xl border border-navy-100 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-navy-500 uppercase tracking-wider">
                Predicted High-Risk Zones
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-navy-900">
                {REGIONAL_RISK_SUMMARY.highRiskZones}
              </span>
              <span className="text-xs font-medium text-amber-600">Short-term danger</span>
            </div>
            <p className="text-xs text-navy-400 mt-2">Triggered by IMERG precipitation trends</p>
          </div>

          {/* Card 3: AI Truth Engine Confidence */}
          <div className="bg-white p-5 rounded-xl border border-navy-100 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-navy-500 uppercase tracking-wider">
                AI Verified Reports
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-navy-900">
                {REGIONAL_RISK_SUMMARY.verifiedReports}
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                92% Avg Conf.
              </span>
            </div>
            <p className="text-xs text-navy-400 mt-2">Multi-signal truth engine cross-checked</p>
          </div>

          {/* Card 4: Shelters Available */}
          <div className="bg-white p-5 rounded-xl border border-navy-100 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-navy-500 uppercase tracking-wider">
                Shelter Capacity
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-navy-900">
                {REGIONAL_RISK_SUMMARY.totalShelterCapacity - REGIONAL_RISK_SUMMARY.currentShelterOccupancy}
              </span>
              <span className="text-xs text-navy-400">
                / {REGIONAL_RISK_SUMMARY.totalShelterCapacity} Open
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-navy-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div
                className="bg-primary-500 h-full rounded-full"
                style={{
                  width: `${(REGIONAL_RISK_SUMMARY.currentShelterOccupancy / REGIONAL_RISK_SUMMARY.totalShelterCapacity) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* --- MAIN GRID: MAP & INCIDENT FEED --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Live Map Console (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-navy-100 shadow-[var(--shadow-card)] flex flex-col overflow-hidden">
            {/* Map Action Bar */}
            <div className="p-4 border-b border-navy-100 flex flex-wrap items-center justify-between gap-3 bg-white">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-navy-900">
                  Regional Geospatial Radar
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  OSM Live Feed
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-navy-50 p-1 rounded-lg text-xs font-medium">
                {['ALL', 'Flood', 'Fire', 'Landslide'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilterType(f)}
                    className={`px-2.5 py-1 rounded-md transition ${
                      filterType === f
                        ? 'bg-white text-navy-900 shadow-xs font-semibold'
                        : 'text-navy-500 hover:text-navy-900'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Leaflet Map Frame */}
            <div className="h-[420px] w-full relative">
              <MapContainer
                center={[22.5, 79.5]}
                zoom={4.8}
                scrollWheelZoom={true}
                className="w-full h-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {/* Plot Incidents */}
                {filteredIncidents.map((inc) => {
                  const isCrit = inc.severity === 'Critical'
                  const color = isCrit ? '#DC2626' : '#EA580C'
                  return (
                    <CircleMarker
                      key={inc.id}
                      center={inc.coordinates}
                      radius={isCrit ? 10 : 8}
                      pathOptions={{
                        color: color,
                        fillColor: color,
                        fillOpacity: 0.35,
                        weight: 2,
                      }}
                      eventHandlers={{
                        click: () => setSelectedIncident(inc),
                      }}
                    >
                      <Tooltip direction="top" offset={[0, -6]}>
                        <div className="text-xs">
                          <strong>{inc.title}</strong>
                          <br />
                          <span className="text-navy-500">{inc.locationName}</span>
                          <br />
                          <span className="font-semibold text-red-600">[{inc.severity} Severity]</span>
                        </div>
                      </Tooltip>
                    </CircleMarker>
                  )
                })}

                {/* Plot Shelters */}
                {SIMULATED_SHELTERS.map((shl) => (
                  <CircleMarker
                    key={shl.id}
                    center={shl.coordinates}
                    radius={6}
                    pathOptions={{
                      color: '#16A34A',
                      fillColor: '#22C55E',
                      fillOpacity: 0.4,
                      weight: 1.5,
                    }}
                  >
                    <Popup>
                      <div className="text-xs space-y-1">
                        <strong className="text-emerald-700">{shl.name}</strong>
                        <p className="text-navy-600">City: {shl.city}</p>
                        <p className="text-navy-600">Available: {shl.totalCapacity - shl.currentOccupants} beds</p>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>

              {/* Map Floating Legend */}
              <div className="absolute bottom-3 right-3 z-[1000] bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-navy-100 shadow-md text-[11px] space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                  <span className="text-navy-700 font-medium">Critical Incident</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                  <span className="text-navy-700 font-medium">High/Mod Incident</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-navy-700 font-medium">Verified Shelter</span>
                </div>
              </div>
            </div>

            {/* Map footer link to full screen */}
            <div className="p-3 bg-navy-50/50 border-t border-navy-100 flex items-center justify-between text-xs">
              <span className="text-navy-500">Showing {filteredIncidents.length} active geocoded events</span>
              <Link
                to="/map"
                className="font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
              >
                Expand Full Interactive Map &amp; Layers
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Incident Triage & AI Truth Inspector (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Selected Incident Inspector */}
            {selectedIncident && (
              <div className="bg-white rounded-xl border border-navy-100 shadow-[var(--shadow-card)] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(selectedIncident.type)}
                    <span className="text-xs font-bold text-navy-400 uppercase">
                      {selectedIncident.id}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getSeverityBadge(
                      selectedIncident.severity
                    )}`}
                  >
                    {selectedIncident.severity}
                  </span>
                </div>

                <h3 className="font-bold text-base text-navy-900 mt-2">
                  {selectedIncident.title}
                </h3>
                <p className="text-xs text-navy-500 mt-0.5">{selectedIncident.locationName}</p>

                <p className="text-xs text-navy-600 bg-navy-50/70 p-3 rounded-lg mt-3 leading-relaxed">
                  {selectedIncident.description}
                </p>

                {/* AI Truth Engine Breakdown Box */}
                <div className="mt-4 pt-3 border-t border-navy-100 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-navy-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      AI Truth Engine Verification
                    </span>
                    <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {(selectedIncident.verification.confidenceScore * 100).toFixed(0)}% Confidence
                    </span>
                  </div>

                  {/* Verification Signals Checklist */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="flex items-center gap-1.5 p-2 rounded bg-navy-50/60">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          selectedIncident.verification.truthEngineSignals.satelliteCorroboration
                            ? 'text-emerald-600'
                            : 'text-navy-300'
                        }`}
                      />
                      <span>Satellite Match</span>
                    </div>

                    <div className="flex items-center gap-1.5 p-2 rounded bg-navy-50/60">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          selectedIncident.verification.truthEngineSignals.weatherAnomalyMatch
                            ? 'text-emerald-600'
                            : 'text-navy-300'
                        }`}
                      />
                      <span>Weather Trend Match</span>
                    </div>

                    <div className="flex items-center gap-1.5 p-2 rounded bg-navy-50/60">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          selectedIncident.verification.truthEngineSignals.geoProximityReports > 1
                            ? 'text-emerald-600'
                            : 'text-navy-300'
                        }`}
                      />
                      <span>
                        {selectedIncident.verification.truthEngineSignals.geoProximityReports} Nearby Reports
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 p-2 rounded bg-navy-50/60">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          selectedIncident.verification.truthEngineSignals.imageDamageConfidence
                            ? 'text-emerald-600'
                            : 'text-navy-300'
                        }`}
                      />
                      <span>
                        Image CNN:{' '}
                        {selectedIncident.verification.truthEngineSignals.imageDamageConfidence
                          ? `${(selectedIncident.verification.truthEngineSignals.imageDamageConfidence * 100).toFixed(0)}%`
                          : 'None'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Incident CTAs */}
                <div className="mt-4 pt-3 flex gap-2">
                  <Link
                    to="/route-planner"
                    className="flex-1 text-center py-2 text-xs font-semibold bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition"
                  >
                    Compute Safe Route
                  </Link>
                  <Link
                    to="/rescue-operations"
                    className="flex-1 text-center py-2 text-xs font-semibold border border-navy-200 hover:bg-navy-50 text-navy-700 rounded-lg transition"
                  >
                    Assign Rescue Unit
                  </Link>
                </div>
              </div>
            )}

            {/* Priority Incident Queue List */}
            <div className="bg-white rounded-xl border border-navy-100 shadow-[var(--shadow-card)] p-4">
              <div className="flex items-center justify-between pb-3 border-b border-navy-100">
                <span className="text-xs font-bold text-navy-800 uppercase tracking-wider">
                  Incident Triage Feed
                </span>
                <span className="text-xs text-navy-400">
                  {filteredIncidents.length} active
                </span>
              </div>

              <div className="divide-y divide-navy-50 max-h-[260px] overflow-y-auto">
                {filteredIncidents.map((inc) => (
                  <button
                    key={inc.id}
                    onClick={() => setSelectedIncident(inc)}
                    className={`w-full text-left p-3 hover:bg-navy-50/80 transition rounded-lg my-1 flex items-start justify-between gap-2 ${
                      selectedIncident?.id === inc.id ? 'bg-primary-50/60 border border-primary-200' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(inc.type)}
                        <span className="font-semibold text-xs text-navy-900">
                          {inc.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-navy-500 mt-0.5">{inc.locationName}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getSeverityBadge(
                          inc.severity
                        )}`}
                      >
                        {inc.severity}
                      </span>
                      <p className="text-[10px] text-navy-400 mt-1 flex items-center justify-end gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {inc.reportedAt}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
