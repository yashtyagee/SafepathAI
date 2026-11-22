/**
 * ReportIncident — Citizen disaster reporting & visual evidence upload
 *
 * Implements:
 * - Hazard category & severity triage
 * - Interactive Leaflet coordinate picker (click map to set location)
 * - Browser GPS geolocation button
 * - Visual evidence photo upload with preview
 * - Trapped / affected casualty estimation
 * - Post-submission tracking ticket generation
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import DashboardLayout from '../layouts/DashboardLayout'
import {
  UploadCloud,
  MapPin,
  AlertTriangle,
  Camera,
  CheckCircle2,
  Users,
  Compass,
  ArrowRight,
  ShieldAlert,
  Info,
  X,
  FileText,
} from 'lucide-react'

// Fix default leaflet marker icon issue in Vite/Webpack
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Map click listener component
function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng])
    },
  })

  return position ? <Marker position={position} /> : null
}

const HAZARD_TYPES = [
  { id: 'Flood', label: 'Flood / Waterlogging', icon: '🌊', color: 'border-blue-300' },
  { id: 'Fire', label: 'Urban / Forest Fire', icon: '🔥', color: 'border-orange-300' },
  { id: 'Landslide', label: 'Landslide / Rockfall', icon: '⛰️', color: 'border-amber-300' },
  { id: 'Structural', label: 'Building Damage / Collapse', icon: '🏚️', color: 'border-red-300' },
  { id: 'Storm', label: 'Severe Storm / Cyclone', icon: '🌪️', color: 'border-purple-300' },
]

export default function ReportIncident() {
  // Form State
  const [hazardType, setHazardType] = useState('Flood')
  const [severity, setSeverity] = useState('High')
  const [locationName, setLocationName] = useState('')
  const [coords, setCoords] = useState([28.6139, 77.209]) // Default Delhi
  const [description, setDescription] = useState('')
  const [affectedCount, setAffectedCount] = useState('1-10')
  const [medicalUrgency, setMedicalUrgency] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedReport, setSubmittedReport] = useState(null)

  // Handle GPS location
  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords([pos.coords.latitude, pos.coords.longitude])
        },
        () => {
          alert('Could not retrieve browser geolocation. Click manually on the map.')
        }
      )
    }
  }

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate network submission and AI pre-analysis
    setTimeout(() => {
      const generatedId = `INC-${new Date().getFullYear()}-${Math.floor(
        100 + Math.random() * 900
      )}`
      setSubmittedReport({
        id: generatedId,
        type: hazardType,
        severity: severity,
        locationName: locationName || 'Geocoded Coordinates Pin',
        coords: coords,
        timestamp: new Date().toLocaleTimeString(),
        estimatedConfidence: '87% Initial AI Pre-Score',
      })
      setIsSubmitting(false)
    }, 1200)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-navy-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-primary-500" />
              Citizen Emergency Incident Reporting
            </h1>
            <p className="text-xs text-navy-500 mt-1">
              Submit verified ground observations with photographic evidence to accelerate dispatch.
            </p>
          </div>
          <span className="text-[11px] font-mono font-semibold px-2.5 py-1 bg-primary-50 text-primary-700 rounded-md border border-primary-200 self-start sm:self-center">
            STAGE 3: INGESTION &amp; VERIFICATION
          </span>
        </div>

        {/* Submission Confirmation Modal / Box */}
        {submittedReport ? (
          <div className="bg-white rounded-xl border border-emerald-200 shadow-lg p-6 sm:p-8 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 text-emerald-600 mb-4">
              <CheckCircle2 className="w-8 h-8" />
              <div>
                <h2 className="text-lg font-bold text-navy-900">
                  Incident Successfully Logged!
                </h2>
                <p className="text-xs text-navy-500">
                  Tracking ID: <span className="font-mono font-bold text-primary-600">{submittedReport.id}</span>
                </p>
              </div>
            </div>

            <div className="bg-navy-50/70 p-4 rounded-xl border border-navy-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-navy-500">Hazard Type:</span>
                <span className="font-bold text-navy-900">{submittedReport.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-500">Reported Severity:</span>
                <span className="font-bold text-red-600">{submittedReport.severity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-500">GPS Coordinates:</span>
                <span className="font-mono text-navy-900">
                  {submittedReport.coords[0].toFixed(4)}, {submittedReport.coords[1].toFixed(4)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-500">Initial AI Truth Engine Evaluation:</span>
                <span className="font-bold text-emerald-700">{submittedReport.estimatedConfidence}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/command-center"
                className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-xs font-semibold transition"
              >
                View on Command Center
              </Link>
              <button
                onClick={() => {
                  setSubmittedReport(null)
                  setDescription('')
                  setImagePreview(null)
                  setImageFile(null)
                }}
                className="px-5 py-2.5 border border-navy-200 hover:bg-navy-50 text-navy-700 rounded-lg text-xs font-semibold transition"
              >
                Submit Another Report
              </button>
            </div>
          </div>
        ) : (
          /* Report Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Hazard Classification */}
            <div className="bg-white p-5 rounded-xl border border-navy-100 shadow-[var(--shadow-card)] space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-navy-900 border-b border-navy-50 pb-2">
                <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>Select Hazard Classification</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {HAZARD_TYPES.map((h) => (
                  <button
                    type="button"
                    key={h.id}
                    onClick={() => setHazardType(h.id)}
                    className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                      hazardType === h.id
                        ? 'border-primary-500 bg-primary-50/70 shadow-xs'
                        : 'border-navy-100 hover:border-navy-200 bg-white'
                    }`}
                  >
                    <span className="text-2xl">{h.icon}</span>
                    <span className="text-xs font-medium text-navy-800 leading-tight">
                      {h.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Severity Selection */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-navy-700 mb-2">
                  Observed Severity Level
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['Low', 'Moderate', 'High', 'Critical'].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSeverity(s)}
                      className={`py-2 text-xs font-bold rounded-lg border transition ${
                        severity === s
                          ? s === 'Critical'
                            ? 'bg-red-600 text-white border-red-600'
                            : s === 'High'
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-primary-500 text-white border-primary-500'
                          : 'bg-navy-50 text-navy-600 border-transparent hover:bg-navy-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Location Picker */}
            <div className="bg-white p-5 rounded-xl border border-navy-100 shadow-[var(--shadow-card)] space-y-4">
              <div className="flex items-center justify-between border-b border-navy-50 pb-2">
                <div className="flex items-center gap-2 text-sm font-bold text-navy-900">
                  <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>Geographic Pinpoint (Click on map)</span>
                </div>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 bg-primary-50 px-2.5 py-1 rounded-md border border-primary-100"
                >
                  <Compass className="w-3.5 h-3.5" />
                  Use GPS
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-navy-600 mb-1">
                    Landmark / Sector Description
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Near Ring Road Flyover, East Delhi"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-navy-200 focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy-600 mb-1">
                    Coordinates (Auto-updated by map click)
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={`${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`}
                    className="w-full text-xs p-2.5 rounded-lg bg-navy-50 border border-navy-200 text-navy-700 font-mono"
                  />
                </div>
              </div>

              {/* Mini Interactive Coordinate Picker */}
              <div className="h-52 w-full rounded-xl overflow-hidden border border-navy-200 relative">
                <MapContainer
                  center={coords}
                  zoom={11}
                  scrollWheelZoom={false}
                  className="w-full h-full"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationMarker position={coords} setPosition={setCoords} />
                </MapContainer>
                <div className="absolute top-2 left-2 z-[1000] bg-white/90 backdrop-blur-xs px-2 py-1 rounded text-[10px] font-medium text-navy-700 border border-navy-200">
                  Click anywhere to place incident marker
                </div>
              </div>
            </div>

            {/* Step 3: Evidence & Description */}
            <div className="bg-white p-5 rounded-xl border border-navy-100 shadow-[var(--shadow-card)] space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-navy-900 border-b border-navy-50 pb-2">
                <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>Visual Evidence &amp; Ground Details</span>
              </div>

              {/* Photo Upload Zone */}
              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1">
                  Upload Supporting Photograph (CNN Verification)
                </label>
                <div className="mt-1 border-2 border-dashed border-navy-200 rounded-xl p-4 text-center hover:bg-navy-50/50 transition relative">
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Evidence preview"
                        className="max-h-40 rounded-lg border border-navy-200 shadow-sm object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null)
                          setImageFile(null)
                        }}
                        className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full shadow hover:bg-red-700"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center">
                      <Camera className="w-8 h-8 text-primary-400 mb-1" />
                      <span className="text-xs font-semibold text-primary-600">
                        Select disaster image file
                      </span>
                      <span className="text-[11px] text-navy-400 mt-0.5">
                        JPEG or PNG up to 10MB
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1">
                  Incident Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe visible water levels, smoke intensity, stranded vehicles, or structural damage..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs p-3 rounded-lg border border-navy-200 focus:outline-none focus:border-primary-500 leading-relaxed"
                />
              </div>

              {/* Casualties & Medical check */}
              <div className="grid sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-navy-700 mb-1">
                    Estimated Affected / Stranded Citizens
                  </label>
                  <select
                    value={affectedCount}
                    onChange={(e) => setAffectedCount(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-navy-200 bg-white"
                  >
                    <option value="1-5">1 - 5 citizens</option>
                    <option value="6-20">6 - 20 citizens</option>
                    <option value="21-50">21 - 50 citizens</option>
                    <option value="50+">50+ citizens (Critical)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="medHelp"
                    checked={medicalUrgency}
                    onChange={(e) => setMedicalUrgency(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded border-navy-300 focus:ring-red-500"
                  />
                  <label htmlFor="medHelp" className="text-xs font-bold text-red-700">
                    Immediate Medical Assistance Required
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Link
                to="/command-center"
                className="px-5 py-2.5 border border-navy-200 hover:bg-navy-50 text-navy-700 rounded-lg text-xs font-semibold transition"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white rounded-lg text-xs font-bold transition shadow-md flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Transmitting &amp; Scoring...</span>
                ) : (
                  <>
                    <span>Submit Incident Report</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </DashboardLayout>
  )
}
