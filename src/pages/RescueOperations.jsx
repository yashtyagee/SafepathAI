/**
 * RescueOperations — Rescue Request Prioritization & Dispatch Coordination
 * Stage 5: RESCUE
 *
 * Implements an explainable multi-factor weighted scoring model:
 * Priority = 0.35*Severity + 0.30*Population + 0.25*Medical + 0.10*Accessibility
 */

import { useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import {
  LifeBuoy,
  Siren,
  Users,
  HeartPulse,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  PhoneCall,
  MapPin,
  ChevronRight,
  Filter,
} from 'lucide-react'
import { SIMULATED_SHELTERS } from '../constants/mockData'

// Simulated Emergency Rescue Queue with detailed triage scoring
const INITIAL_RESCUE_REQUESTS = [
  {
    id: 'REQ-101',
    incidentRef: 'INC-2026-081',
    location: 'Yamuna Floodplain, Block 4 Settlement',
    hazardType: 'Flood / Water Inundation',
    reportedAgo: '14 mins ago',
    trappedCount: 18,
    medicalUrgent: true,
    medicalDetails: '3 elderly individuals with hypothermia symptoms',
    accessibility: 'Road Severed (Boats Required)',
    status: 'Queued', // Queued, Dispatched, In Progress, Resolved
    assignedUnit: null,
    // Scoring Weights breakdown
    scores: {
      severityScore: 90,
      populationScore: 85,
      medicalScore: 100,
      accessibilityPenalty: 80,
      compositePriority: 89, // Out of 100
    },
    suggestedShelter: SIMULATED_SHELTERS[0],
  },
  {
    id: 'REQ-102',
    incidentRef: 'INC-2026-082',
    location: 'MIDC Gate 2, Commercial Warehouse',
    hazardType: 'Industrial Fire / Smoke',
    reportedAgo: '26 mins ago',
    trappedCount: 8,
    medicalUrgent: true,
    medicalDetails: 'Smoke inhalation distress reported',
    accessibility: 'Perimeter Restricted',
    status: 'Dispatched',
    assignedUnit: 'SDRF Fire & Hazmat Team 02',
    scores: {
      severityScore: 95,
      populationScore: 60,
      medicalScore: 90,
      accessibilityPenalty: 70,
      compositePriority: 81,
    },
    suggestedShelter: SIMULATED_SHELTERS[2],
  },
  {
    id: 'REQ-103',
    incidentRef: 'INC-2026-083',
    location: 'NH-58 Mountain Pass km 44',
    hazardType: 'Landslide Debris Cutoff',
    reportedAgo: '52 mins ago',
    trappedCount: 4,
    medicalUrgent: false,
    medicalDetails: 'No acute trauma, rations running low',
    accessibility: 'Heavy Machinery Required',
    status: 'Queued',
    assignedUnit: null,
    scores: {
      severityScore: 80,
      populationScore: 40,
      medicalScore: 20,
      accessibilityPenalty: 95,
      compositePriority: 55,
    },
    suggestedShelter: SIMULATED_SHELTERS[1],
  },
  {
    id: 'REQ-104',
    incidentRef: 'INC-2026-084',
    location: 'Velachery Bus Stand Underpass',
    hazardType: 'Urban Waterlogging',
    reportedAgo: '1 hr ago',
    trappedCount: 3,
    medicalUrgent: false,
    medicalDetails: 'Stranded vehicle passengers',
    accessibility: 'Wading Access (Tractor/Truck)',
    status: 'Resolved',
    assignedUnit: 'Local Police Quick Response',
    scores: {
      severityScore: 45,
      populationScore: 30,
      medicalScore: 10,
      accessibilityPenalty: 30,
      compositePriority: 31,
    },
    suggestedShelter: SIMULATED_SHELTERS[3],
  },
]

export default function RescueOperations() {
  const [requests, setRequests] = useState(INITIAL_RESCUE_REQUESTS)
  const [selectedReq, setSelectedReq] = useState(INITIAL_RESCUE_REQUESTS[0])
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [selectedUnit, setSelectedUnit] = useState('NDRF Inflatable Boat Rescue Unit 1')

  // Filtered
  const filteredRequests = requests.filter((r) => {
    if (statusFilter === 'ALL') return true
    return r.status.toLowerCase() === statusFilter.toLowerCase()
  })

  // Assign Unit Handler
  const handleAssignUnit = () => {
    if (!selectedReq) return
    const updated = requests.map((item) => {
      if (item.id === selectedReq.id) {
        return {
          ...item,
          status: 'Dispatched',
          assignedUnit: selectedUnit,
        }
      }
      return item
    })
    setRequests(updated)
    setSelectedReq({ ...selectedReq, status: 'Dispatched', assignedUnit: selectedUnit })
  }

  // Priority badge helper
  const getPriorityBadge = (score) => {
    if (score >= 80) return 'bg-red-50 text-red-700 border-red-200'
    if (score >= 60) return 'bg-orange-50 text-orange-700 border-orange-200'
    return 'bg-blue-50 text-blue-700 border-blue-200'
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-navy-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2">
              <LifeBuoy className="w-6 h-6 text-primary-500" />
              Rescue Prioritization &amp; Dispatch Console
            </h1>
            <p className="text-xs text-navy-500 mt-1">
              Objective, rule-based urgency triage ranking distress requests by casualty count, medical need, and hazard severity.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-warning-50 text-warning-700 rounded-md border border-warning-200 self-start sm:self-center">
            STAGE 5: RESCUE
          </span>
        </div>

        {/* Top Operational Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-navy-100 shadow-[var(--shadow-card)]">
            <span className="text-[11px] font-semibold text-navy-400 uppercase">Total Distress Calls</span>
            <p className="text-2xl font-extrabold text-navy-900 mt-1">{requests.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-navy-100 shadow-[var(--shadow-card)]">
            <span className="text-[11px] font-semibold text-red-600 uppercase">Critical Priority</span>
            <p className="text-2xl font-extrabold text-red-600 mt-1">
              {requests.filter((r) => r.scores.compositePriority >= 80).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-navy-100 shadow-[var(--shadow-card)]">
            <span className="text-[11px] font-semibold text-amber-600 uppercase">Pending Dispatch</span>
            <p className="text-2xl font-extrabold text-amber-600 mt-1">
              {requests.filter((r) => r.status === 'Queued').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-navy-100 shadow-[var(--shadow-card)]">
            <span className="text-[11px] font-semibold text-emerald-600 uppercase">Active Units Deployed</span>
            <p className="text-2xl font-extrabold text-emerald-700 mt-1">
              {requests.filter((r) => r.status === 'Dispatched').length}
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-3 rounded-xl border border-navy-100 shadow-[var(--shadow-card)] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-navy-400" />
            <span className="font-semibold text-navy-700">Filter Queue:</span>
            <div className="flex gap-1 bg-navy-50 p-1 rounded-lg">
              {['ALL', 'Queued', 'Dispatched', 'Resolved'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded transition font-medium ${
                    statusFilter === st
                      ? 'bg-white font-bold text-navy-900 shadow-xs'
                      : 'text-navy-500 hover:text-navy-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
          <span className="text-navy-400 text-[11px]">Ranked by SafePath Priority Index</span>
        </div>

        {/* Main Grid: Priority Ranked Queue (7 cols) vs Selected Request Inspector & Dispatch (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Priority Triage Queue (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                onClick={() => setSelectedReq(req)}
                className={`p-4 rounded-xl border bg-white shadow-[var(--shadow-card)] cursor-pointer transition flex items-start justify-between gap-4 ${
                  selectedReq?.id === req.id
                    ? 'border-primary-500 bg-primary-50/20 shadow-md ring-1 ring-primary-500'
                    : 'border-navy-100 hover:border-navy-200'
                }`}
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-navy-400">{req.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        req.status === 'Queued'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : req.status === 'Dispatched'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-gray-50 text-gray-600 border-gray-200'
                      }`}
                    >
                      {req.status}
                    </span>
                    {req.medicalUrgent && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-800 flex items-center gap-1">
                        <HeartPulse className="w-3 h-3 text-red-600" />
                        Medical
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-sm text-navy-900 truncate">{req.location}</h3>
                  <p className="text-xs text-navy-500">{req.hazardType}</p>

                  <div className="flex items-center gap-4 text-[11px] text-navy-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-navy-400" />
                      <strong>{req.trappedCount}</strong> citizens
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-navy-400" />
                      {req.reportedAgo}
                    </span>
                  </div>
                </div>

                {/* Score Pill */}
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-semibold text-navy-400 block uppercase">
                    Priority Score
                  </span>
                  <span
                    className={`inline-block text-xl font-extrabold px-3 py-1 rounded-lg border mt-1 ${getPriorityBadge(
                      req.scores.compositePriority
                    )}`}
                  >
                    {req.scores.compositePriority}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Detailed Inspection & Dispatch Action Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {selectedReq && (
              <div className="bg-white rounded-xl border border-navy-100 shadow-[var(--shadow-card)] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-navy-50 pb-2">
                  <span className="text-xs font-bold text-navy-800 uppercase">
                    Dispatch Inspector: {selectedReq.id}
                  </span>
                  <span className="text-xs font-bold text-primary-600">
                    Ref: {selectedReq.incidentRef}
                  </span>
                </div>

                {/* Mathematical Priority Scoring Decomposition */}
                <div>
                  <h4 className="text-xs font-bold text-navy-700 uppercase tracking-wider mb-2">
                    Priority Score Calculation (Weight Breakdown)
                  </h4>
                  <div className="bg-navy-50/60 p-3 rounded-lg border border-navy-100 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-navy-600">Hazard Severity Weight (35%):</span>
                      <strong className="text-navy-900 font-mono">{selectedReq.scores.severityScore}/100</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-600">Affected Population Weight (30%):</span>
                      <strong className="text-navy-900 font-mono">{selectedReq.scores.populationScore}/100</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-600">Medical Urgency Weight (25%):</span>
                      <strong className="text-red-700 font-mono">{selectedReq.scores.medicalScore}/100</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-600">Accessibility Difficulty (10%):</span>
                      <strong className="text-navy-900 font-mono">{selectedReq.scores.accessibilityPenalty}/100</strong>
                    </div>
                  </div>
                </div>

                {/* Medical Details */}
                {selectedReq.medicalUrgent && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-900">
                    <strong>Medical Triage Note:</strong> {selectedReq.medicalDetails}
                  </div>
                )}

                {/* Recommended Shelter */}
                <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    <span>Target Evacuation Shelter</span>
                  </div>
                  <p className="text-navy-700 font-semibold">{selectedReq.suggestedShelter.name}</p>
                  <p className="text-navy-500 text-[11px]">
                    Capacity: {selectedReq.suggestedShelter.totalCapacity - selectedReq.suggestedShelter.currentOccupants} beds available ({selectedReq.suggestedShelter.city})
                  </p>
                </div>

                {/* Unit Assignment Action */}
                <div className="pt-2 border-t border-navy-100 space-y-3">
                  <label className="block text-xs font-bold text-navy-800">
                    Assign Emergency Response Unit
                  </label>
                  <select
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-navy-200 bg-white"
                  >
                    <option value="NDRF Inflatable Boat Rescue Unit 1">
                      NDRF Inflatable Boat Rescue Unit 1 (Water Specialized)
                    </option>
                    <option value="SDRF Fire & Hazmat Team 02">
                      SDRF Fire &amp; Hazmat Team 02 (Thermal Resistant)
                    </option>
                    <option value="State Emergency Medical Service Van 08">
                      State EMS Ambulance 08 (Advanced Life Support)
                    </option>
                    <option value="Civil Evacuation Transport Bus 14">
                      Civil Evacuation Bus 14 (Mass Transport)
                    </option>
                  </select>

                  <button
                    onClick={handleAssignUnit}
                    disabled={selectedReq.status === 'Resolved'}
                    className="w-full py-2.5 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white rounded-lg text-xs font-bold transition shadow-sm flex items-center justify-center gap-2"
                  >
                    <Truck className="w-4 h-4" />
                    <span>
                      {selectedReq.status === 'Dispatched'
                        ? 'Update Assigned Response Unit'
                        : 'Deploy Unit & Dispatch'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
