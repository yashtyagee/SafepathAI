/**
 * RoutePlanner — Hazard-Aware Navigation & Evacuation Pathfinding
 * Stage 4: NAVIGATE
 *
 * Compares naive shortest distance routing vs SafePath Hazard-Aware path
 * that dynamically penalizes flooded, fire-damaged, or blocked road segments.
 */

import { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Popup,
  Tooltip,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import DashboardLayout from '../layouts/DashboardLayout'
import {
  SIMULATED_INCIDENTS,
  SIMULATED_SHELTERS,
  SIMULATED_ROAD_HAZARDS,
} from '../constants/mockData'
import {
  Navigation,
  ShieldCheck,
  AlertTriangle,
  Route as RouteIcon,
  Clock,
  ArrowRight,
  Info,
  MapPin,
  Building2,
  CheckCircle2,
  Zap,
} from 'lucide-react'

// Simulated Precomputed Route Waypoints for Demonstration Scenarios
const ROUTE_SCENARIOS = {
  delhi: {
    name: 'Delhi Flood Inundation Corridor',
    startName: 'Mayur Vihar Residential Zone (Flood Inundation Risk)',
    startCoords: [28.6085, 77.295],
    endName: 'Govt Model Secondary School Relief Center (Safe Shelter)',
    endCoords: [28.6385, 77.2341],
    // Naive route cuts straight through flooded Yamuna Marg
    naiveRoute: [
      [28.6085, 77.295],
      [28.621, 77.272],
      [28.6315, 77.2512], // BLOCKED SEGMENT (Deep Flooding)
      [28.634, 77.242],
      [28.6385, 77.2341],
    ],
    // SafePath route loops north via higher elevated bypass
    safeRoute: [
      [28.6085, 77.295],
      [28.615, 77.305],
      [28.642, 77.292],
      [28.651, 77.265], // High-elevation flyover avoiding flood basin
      [28.645, 77.245],
      [28.6385, 77.2341],
    ],
    hazardAvoided: 'Yamuna Marg Lower Bypass (Water Depth > 80cm)',
    naiveDistanceKm: '6.4 km',
    safeDistanceKm: '8.9 km',
    naiveTimeMin: 'Blocked / Impassable',
    safeTimeMin: '19 mins',
    dangerExposure: '85% Hazard Exposure',
    safeExposure: '0% Hazard Exposure (Verified Safe)',
  },
  mumbai: {
    name: 'Mumbai MIDC Substation Fire Front',
    startName: 'Andheri East Industrial Gate 3',
    startCoords: [19.1176, 72.8797],
    endName: 'Bandra Community Emergency Hall',
    endCoords: [19.0596, 72.8295],
    naiveRoute: [
      [19.1176, 72.8797],
      [19.1082, 72.8821], // Heavy smoke / emergency perimeter
      [19.085, 72.855],
      [19.0596, 72.8295],
    ],
    safeRoute: [
      [19.1176, 72.8797],
      [19.124, 72.862],
      [19.095, 72.842],
      [19.072, 72.835],
      [19.0596, 72.8295],
    ],
    hazardAvoided: 'Andheri-Kurla Link Road (Active Fire Perimeter & Toxic Smoke)',
    naiveDistanceKm: '9.2 km',
    safeDistanceKm: '11.4 km',
    naiveTimeMin: 'Severe Delay (Blocked)',
    safeTimeMin: '26 mins',
    dangerExposure: '92% Danger Exposure',
    safeExposure: '0% Hazard Exposure',
  },
}

export default function RoutePlanner() {
  const [selectedScenarioKey, setSelectedScenarioKey] = useState('delhi')
  const [activeRouteMode, setActiveRouteMode] = useState('safe') // 'safe' | 'naive' | 'both'

  const scenario = ROUTE_SCENARIOS[selectedScenarioKey]

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-navy-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2">
              <Navigation className="w-6 h-6 text-primary-500" />
              Hazard-Aware Evacuation &amp; Routing
            </h1>
            <p className="text-xs text-navy-500 mt-1">
              Dynamic edge-weighted pathfinding on OpenStreetMap. Circumvents active floodings, fires, and collapsed infrastructure.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-primary-50 text-primary-700 rounded-md border border-primary-200 self-start sm:self-center">
            STAGE 4: NAVIGATE
          </span>
        </div>

        {/* Scenario Selector & Comparison Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-navy-100 shadow-[var(--shadow-card)] flex flex-wrap items-center justify-between gap-4">
          {/* Scenario tabs */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-navy-700">Evacuation Scenario:</span>
            <div className="flex gap-1.5 bg-navy-50 p-1 rounded-lg text-xs font-medium">
              <button
                onClick={() => setSelectedScenarioKey('delhi')}
                className={`px-3 py-1.5 rounded-md transition ${
                  selectedScenarioKey === 'delhi'
                    ? 'bg-white font-bold text-navy-900 shadow-xs'
                    : 'text-navy-500 hover:text-navy-900'
                }`}
              >
                🌊 Delhi Yamuna Flood
              </button>
              <button
                onClick={() => setSelectedScenarioKey('mumbai')}
                className={`px-3 py-1.5 rounded-md transition ${
                  selectedScenarioKey === 'mumbai'
                    ? 'bg-white font-bold text-navy-900 shadow-xs'
                    : 'text-navy-500 hover:text-navy-900'
                }`}
              >
                🔥 Mumbai Substation Fire
              </button>
            </div>
          </div>

          {/* Route Mode Toggles */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-navy-500">Route Display:</span>
            <div className="flex gap-1 bg-navy-50 p-1 rounded-lg text-xs">
              <button
                onClick={() => setActiveRouteMode('safe')}
                className={`px-2.5 py-1 rounded transition font-semibold ${
                  activeRouteMode === 'safe'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-navy-600 hover:text-navy-900'
                }`}
              >
                SafePath (Recommended)
              </button>
              <button
                onClick={() => setActiveRouteMode('naive')}
                className={`px-2.5 py-1 rounded transition font-semibold ${
                  activeRouteMode === 'naive'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-navy-600 hover:text-navy-900'
                }`}
              >
                Standard Naive
              </button>
              <button
                onClick={() => setActiveRouteMode('both')}
                className={`px-2.5 py-1 rounded transition font-semibold ${
                  activeRouteMode === 'both'
                    ? 'bg-primary-600 text-white shadow-xs'
                    : 'text-navy-600 hover:text-navy-900'
                }`}
              >
                Compare Both
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid: Interactive Route Map (7 cols) vs Routing Metric Card (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Leaflet Map Frame (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-navy-100 shadow-[var(--shadow-card)] overflow-hidden flex flex-col">
            <div className="h-[460px] w-full relative">
              <MapContainer
                key={selectedScenarioKey}
                center={scenario.startCoords}
                zoom={12}
                scrollWheelZoom={true}
                className="w-full h-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {/* 1. Naive Path (Red / Dashed) */}
                {(activeRouteMode === 'naive' || activeRouteMode === 'both') && (
                  <Polyline
                    positions={scenario.naiveRoute}
                    pathOptions={{
                      color: '#DC2626',
                      weight: 4,
                      dashArray: '6, 6',
                      opacity: 0.85,
                    }}
                  />
                )}

                {/* 2. SafePath Hazard-Aware Path (Solid Emerald) */}
                {(activeRouteMode === 'safe' || activeRouteMode === 'both') && (
                  <Polyline
                    positions={scenario.safeRoute}
                    pathOptions={{
                      color: '#059669',
                      weight: 5,
                      opacity: 0.95,
                    }}
                  />
                )}

                {/* Start Pin */}
                <CircleMarker
                  center={scenario.startCoords}
                  radius={7}
                  pathOptions={{ color: '#1E40AF', fillColor: '#3B82F6', fillOpacity: 1 }}
                >
                  <Tooltip direction="top">
                    <strong>Origin:</strong> {scenario.startName}
                  </Tooltip>
                </CircleMarker>

                {/* End / Shelter Pin */}
                <CircleMarker
                  center={scenario.endCoords}
                  radius={8}
                  pathOptions={{ color: '#047857', fillColor: '#10B981', fillOpacity: 1 }}
                >
                  <Tooltip direction="top">
                    <strong>Safe Destination:</strong> {scenario.endName}
                  </Tooltip>
                </CircleMarker>

                {/* Plot Obstruction Marker */}
                {SIMULATED_ROAD_HAZARDS.map((rd) => (
                  <CircleMarker
                    key={rd.id}
                    center={rd.coordinates}
                    radius={9}
                    pathOptions={{
                      color: '#B91C1C',
                      fillColor: '#EF4444',
                      fillOpacity: 0.9,
                    }}
                  >
                    <Popup>
                      <div className="text-xs">
                        <strong className="text-red-700">Blocked: {rd.roadName}</strong>
                        <p className="text-navy-600 mt-0.5">{rd.hazardType}</p>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>

              {/* Map Floating Legend */}
              <div className="absolute bottom-3 right-3 z-[1000] bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-navy-100 shadow-md text-[11px] space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-1 bg-emerald-600 rounded"></span>
                  <span className="text-navy-800 font-bold">SafePath Route (Zero Hazard)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-1 border-t-2 border-dashed border-red-600"></span>
                  <span className="text-navy-600">Standard Route (Passes Hazard)</span>
                </div>
              </div>
            </div>

            {/* Map Footnote */}
            <div className="p-3 bg-navy-50/50 border-t border-navy-100 text-xs text-navy-500 flex items-center justify-between">
              <span>Road Edge Penalties calculated via OpenStreetMap Graph</span>
              <span className="font-semibold text-emerald-700">OSM Graph Updated 12m ago</span>
            </div>
          </div>

          {/* RIGHT: Route Intelligence Comparison Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Origin & Destination Card */}
            <div className="bg-white rounded-xl border border-navy-100 shadow-[var(--shadow-card)] p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-navy-800 uppercase tracking-wider border-b border-navy-50 pb-2">
                <MapPin className="w-4 h-4 text-primary-500" />
                Active Route Corridor
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0"></span>
                  <div>
                    <span className="text-navy-400 block text-[10px]">EVACUATION START POINT:</span>
                    <strong className="text-navy-900">{scenario.startName}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1 shrink-0"></span>
                  <div>
                    <span className="text-navy-400 block text-[10px]">RECOMMENDED SHELTER:</span>
                    <strong className="text-emerald-700">{scenario.endName}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Cards: SafePath vs Naive */}
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-900 uppercase">
                    SafePath AI Recommendation
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-800">
                  RECOMMENDED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-center">
                <div className="bg-white p-2.5 rounded-lg border border-emerald-100">
                  <span className="text-[10px] text-navy-400 block">DISTANCE</span>
                  <strong className="text-sm font-bold text-navy-900">{scenario.safeDistanceKm}</strong>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-emerald-100">
                  <span className="text-[10px] text-navy-400 block">EST. TRAVEL TIME</span>
                  <strong className="text-sm font-bold text-emerald-700">{scenario.safeTimeMin}</strong>
                </div>
              </div>

              <div className="text-xs text-emerald-800 bg-white/80 p-2.5 rounded-lg border border-emerald-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Avoids Hazard:</strong> {scenario.hazardAvoided}
                </span>
              </div>
            </div>

            {/* Naive Route Risk Warning Card */}
            <div className="bg-red-50/50 border border-red-200 rounded-xl p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-red-700 font-bold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Standard Shortest Distance Route (DANGEROUS)</span>
              </div>
              <p className="text-red-900/80 leading-relaxed text-[11px]">
                Normal GPS navigators recommend <strong>{scenario.naiveDistanceKm}</strong> via the lowest elevation roadway, unaware that it cuts directly through <strong>{scenario.hazardAvoided}</strong>.
              </p>
            </div>

            {/* Legal / Engineering Disclaimer */}
            <div className="p-3 bg-navy-50 rounded-lg text-[11px] text-navy-600 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-navy-400 shrink-0 mt-0.5" />
              <p className="leading-snug">
                <strong>Safety Disclaimer:</strong> Routes are algorithmically estimated from real-time road blockage reports and satellite telemetry. Follow on-site emergency responder instructions where present.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
