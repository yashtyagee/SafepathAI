/**
 * DisasterMap — Full dedicated interactive geospatial intelligence map
 * 
 * Features:
 * - Dynamic OpenStreetMap layer with Leaflet
 * - Interactive layer toggles (Incidents, Shelters, Road Hazards, Risk Zones)
 * - Severity and type filtering
 * - Side drawer inspector for selected geospatial objects
 * - Road blockages with hazard penalty indicators
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Circle,
  Popup,
  Tooltip,
  useMap,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import DashboardLayout from '../layouts/DashboardLayout'
import {
  SIMULATED_INCIDENTS,
  SIMULATED_SHELTERS,
  SIMULATED_ROAD_HAZARDS,
} from '../constants/mockData'
import {
  Layers,
  Filter,
  Eye,
  AlertTriangle,
  Building2,
  Navigation,
  Flame,
  Droplets,
  Mountain,
  ShieldCheck,
  X,
  Search,
  Crosshair,
  ExternalLink,
} from 'lucide-react'

// Helper component to center map on selection
function MapFlyTo({ targetCoords }) {
  const map = useMap()
  if (targetCoords) {
    map.flyTo(targetCoords, 11, { duration: 1.5 })
  }
  return null
}

export default function DisasterMap() {
  // Layer Toggles
  const [showIncidents, setShowIncidents] = useState(true)
  const [showShelters, setShowShelters] = useState(true)
  const [showRoadHazards, setShowRoadHazards] = useState(true)
  const [showRiskZones, setShowRiskZones] = useState(true)

  // Filters
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [targetFlyCoords, setTargetFlyCoords] = useState(null)

  // Filtered Incidents
  const filteredIncidents = SIMULATED_INCIDENTS.filter((inc) => {
    const matchesType =
      typeFilter === 'ALL' ||
      inc.type.toLowerCase().includes(typeFilter.toLowerCase())
    const matchesSearch =
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.locationName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  // Select and fly to object
  const handleSelectObject = (item, type, coords) => {
    setSelectedItem({ ...item, itemType: type })
    setTargetFlyCoords(coords)
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-10rem)] flex flex-col space-y-3">
        {/* Top Control Bar */}
        <div className="bg-white p-3 rounded-xl border border-navy-100 shadow-[var(--shadow-card)] flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Left: Search & Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-navy-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search city, sector, or hazard..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs bg-navy-50/70 border border-navy-200 rounded-lg text-navy-900 placeholder:text-navy-400 focus:outline-none focus:border-primary-500 w-56 sm:w-64"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-1 bg-navy-50 p-1 rounded-lg text-xs">
              <span className="text-navy-400 px-1.5 font-medium flex items-center gap-1">
                <Filter className="w-3 h-3" />
                Type:
              </span>
              {['ALL', 'Flood', 'Fire', 'Landslide'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-2 py-1 rounded text-xs transition ${
                    typeFilter === t
                      ? 'bg-white font-bold text-navy-900 shadow-xs'
                      : 'text-navy-600 hover:text-navy-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Layer Toggles */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-navy-500 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> Layers:
            </span>

            {/* Incident Layer Toggle */}
            <button
              onClick={() => setShowIncidents(!showIncidents)}
              className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition flex items-center gap-1.5 ${
                showIncidents
                  ? 'bg-red-50 border-red-200 text-red-700'
                  : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${showIncidents ? 'bg-red-600' : 'bg-gray-400'}`} />
              Incidents ({filteredIncidents.length})
            </button>

            {/* Shelter Layer Toggle */}
            <button
              onClick={() => setShowShelters(!showShelters)}
              className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition flex items-center gap-1.5 ${
                showShelters
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${showShelters ? 'bg-emerald-600' : 'bg-gray-400'}`} />
              Shelters ({SIMULATED_SHELTERS.length})
            </button>

            {/* Road Hazards Toggle */}
            <button
              onClick={() => setShowRoadHazards(!showRoadHazards)}
              className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition flex items-center gap-1.5 ${
                showRoadHazards
                  ? 'bg-amber-50 border-amber-200 text-amber-700'
                  : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${showRoadHazards ? 'bg-amber-600' : 'bg-gray-400'}`} />
              Blocked Roads ({SIMULATED_ROAD_HAZARDS.length})
            </button>
          </div>
        </div>

        {/* Map Container Area */}
        <div className="flex-1 relative rounded-xl border border-navy-100 shadow-[var(--shadow-card)] overflow-hidden bg-white">
          <MapContainer
            center={[22.5, 79.5]}
            zoom={5}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            <MapFlyTo targetCoords={targetFlyCoords} />

            {/* 1. INCIDENT MARKERS & DANGER RADIUS */}
            {showIncidents &&
              filteredIncidents.map((inc) => {
                const isCrit = inc.severity === 'Critical'
                const color = isCrit ? '#DC2626' : '#EA580C'
                return (
                  <div key={inc.id}>
                    {/* Danger Radius Circle */}
                    {showRiskZones && (
                      <Circle
                        center={inc.coordinates}
                        radius={isCrit ? 18000 : 9000}
                        pathOptions={{
                          color: color,
                          fillColor: color,
                          fillOpacity: 0.12,
                          weight: 1,
                          dashArray: '4, 4',
                        }}
                      />
                    )}

                    {/* Incident Pin */}
                    <CircleMarker
                      center={inc.coordinates}
                      radius={isCrit ? 10 : 8}
                      pathOptions={{
                        color: color,
                        fillColor: color,
                        fillOpacity: 0.8,
                        weight: 2,
                      }}
                      eventHandlers={{
                        click: () => handleSelectObject(inc, 'incident', inc.coordinates),
                      }}
                    >
                      <Tooltip direction="top" offset={[0, -8]}>
                        <div className="text-xs">
                          <strong className="text-navy-900">{inc.title}</strong>
                          <br />
                          <span className="text-navy-500">{inc.locationName}</span>
                          <br />
                          <span className="font-semibold text-red-600">
                            [{inc.severity} Severity]
                          </span>
                        </div>
                      </Tooltip>
                    </CircleMarker>
                  </div>
                )
              })}

            {/* 2. SHELTER MARKERS */}
            {showShelters &&
              SIMULATED_SHELTERS.map((shl) => (
                <CircleMarker
                  key={shl.id}
                  center={shl.coordinates}
                  radius={7}
                  pathOptions={{
                    color: '#15803D',
                    fillColor: '#22C55E',
                    fillOpacity: 0.9,
                    weight: 2,
                  }}
                  eventHandlers={{
                    click: () => handleSelectObject(shl, 'shelter', shl.coordinates),
                  }}
                >
                  <Tooltip direction="top" offset={[0, -6]}>
                    <div className="text-xs">
                      <strong className="text-emerald-700">{shl.name}</strong>
                      <br />
                      <span>{shl.city} — {shl.totalCapacity - shl.currentOccupants} beds left</span>
                    </div>
                  </Tooltip>
                </CircleMarker>
              ))}

            {/* 3. ROAD HAZARD MARKERS */}
            {showRoadHazards &&
              SIMULATED_ROAD_HAZARDS.map((rd) => (
                <CircleMarker
                  key={rd.id}
                  center={rd.coordinates}
                  radius={8}
                  pathOptions={{
                    color: '#D97706',
                    fillColor: '#F59E0B',
                    fillOpacity: 0.9,
                    weight: 2,
                  }}
                  eventHandlers={{
                    click: () => handleSelectObject(rd, 'road', rd.coordinates),
                  }}
                >
                  <Tooltip direction="top" offset={[0, -6]}>
                    <div className="text-xs">
                      <strong className="text-amber-800">🚧 Blockage: {rd.roadName}</strong>
                      <br />
                      <span className="text-red-600">{rd.hazardType}</span>
                    </div>
                  </Tooltip>
                </CircleMarker>
              ))}
          </MapContainer>

          {/* Floating Map Legend */}
          <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-navy-100 shadow-md text-xs space-y-1.5 w-44">
            <div className="font-bold text-navy-900 border-b border-navy-100 pb-1 flex items-center justify-between">
              <span>Geospatial Legend</span>
              <Layers className="w-3.5 h-3.5 text-navy-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0"></span>
              <span className="text-navy-700">Critical Incident</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0"></span>
              <span className="text-navy-700">High / Mod Hazard</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0"></span>
              <span className="text-navy-700">Emergency Shelter</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
              <span className="text-navy-700">Blocked Road Segment</span>
            </div>
          </div>

          {/* Slide-out Inspector Drawer */}
          {selectedItem && (
            <div className="absolute bottom-4 left-4 z-[1000] w-80 sm:w-96 bg-white rounded-xl border border-navy-100 shadow-xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      selectedItem.itemType === 'incident'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : selectedItem.itemType === 'shelter'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {selectedItem.itemType}
                  </span>
                  <span className="text-xs font-mono text-navy-400">{selectedItem.id}</span>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1 text-navy-400 hover:text-navy-900 rounded-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Location */}
              <h3 className="font-bold text-sm text-navy-900 mt-2">
                {selectedItem.title || selectedItem.name || selectedItem.roadName}
              </h3>
              <p className="text-xs text-navy-500 mt-0.5">
                {selectedItem.locationName || selectedItem.city || 'National Highway Grid'}
              </p>

              {/* Detailed Attributes based on type */}
              {selectedItem.itemType === 'incident' && (
                <div className="mt-3 space-y-2 text-xs">
                  <p className="bg-navy-50 p-2 rounded text-navy-700 leading-relaxed">
                    {selectedItem.description}
                  </p>
                  <div className="flex items-center justify-between text-navy-600">
                    <span>Estimated Affected:</span>
                    <strong className="text-navy-900 font-semibold">{selectedItem.affectedEstimate} citizens</strong>
                  </div>
                  <div className="flex items-center justify-between text-navy-600">
                    <span>AI Verification:</span>
                    <strong className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      {(selectedItem.verification.confidenceScore * 100).toFixed(0)}% Score
                    </strong>
                  </div>
                </div>
              )}

              {selectedItem.itemType === 'shelter' && (
                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-navy-600">
                    <span>Total Capacity:</span>
                    <strong className="text-navy-900">{selectedItem.totalCapacity}</strong>
                  </div>
                  <div className="flex items-center justify-between text-navy-600">
                    <span>Current Vacancies:</span>
                    <strong className="text-emerald-700 font-bold">
                      {selectedItem.totalCapacity - selectedItem.currentOccupants} beds
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-navy-500">Available Amenities:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedItem.amenities.map((a) => (
                        <span key={a} className="bg-navy-50 text-[10px] text-navy-700 px-1.5 py-0.5 rounded">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedItem.itemType === 'road' && (
                <div className="mt-3 space-y-2 text-xs">
                  <div className="p-2 bg-amber-50 border border-amber-200 rounded text-amber-900">
                    <strong>Hazard:</strong> {selectedItem.hazardType}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-navy-600">Status:</span>
                    <strong className="text-red-700">Impassable (Blocked)</strong>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 pt-2 border-t border-navy-100 flex gap-2">
                <Link
                  to="/route-planner"
                  className="flex-1 py-1.5 text-center bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-xs font-semibold transition"
                >
                  Avoid &amp; Route
                </Link>
                <button
                  onClick={() => setTargetFlyCoords(selectedItem.coordinates)}
                  className="p-1.5 border border-navy-200 hover:bg-navy-50 rounded-lg text-navy-600"
                  title="Focus on Map"
                >
                  <Crosshair className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
