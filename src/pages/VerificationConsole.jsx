/**
 * VerificationConsole — Interactive AI Truth Engine Analysis Suite
 * Stage 3: Multi-Signal Reliability Scoring
 *
 * Connects directly to Flask backend: POST http://localhost:5000/api/verify
 * Exposes full mathematical signal attribution & human review controls.
 */

import { useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import {
  ShieldCheck,
  Cpu,
  Sliders,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  RefreshCw,
  Info,
  Radio,
  Camera,
  CloudRain,
  Clock,
  Users,
} from 'lucide-react'

export default function VerificationConsole() {
  // Input Signals State
  const [hazardType, setHazardType] = useState('Flood')
  const [hasSatelliteHit, setHasSatelliteHit] = useState(true)
  const [hasPhoto, setHasPhoto] = useState(true)
  const [imageScore, setImageScore] = useState(0.92)
  const [nearbyReports, setNearbyReports] = useState(5)
  const [weatherAnomalyMatch, setWeatherAnomalyMatch] = useState(true)
  const [minutesAgo, setMinutesAgo] = useState(15)

  // API State
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  // Call Flask Backend API
  const handleRunEvaluation = async () => {
    setLoading(true)
    setErrorMsg(null)

    try {
      const response = await fetch('http://localhost:5000/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: hazardType,
          satellite_detected: hasSatelliteHit,
          has_photo: hasPhoto,
          image_score: hasPhoto ? parseFloat(imageScore) : 0.0,
          nearby_reports_count: parseInt(nearbyReports),
          weather_trend_match: weatherAnomalyMatch,
          minutes_ago: parseInt(minutesAgo),
        }),
      })

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`)
      }

      const json = await response.json()
      setResult(json.evaluation)
    } catch (err) {
      console.error('API Error:', err)
      setErrorMsg(
        'Could not reach Flask backend at http://localhost:5000. Ensure "python app.py" is running in your backend directory.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-navy-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              AI Truth Engine — Multi-Signal Verification
            </h1>
            <p className="text-xs text-navy-500 mt-1">
              Deterministic, explainable scoring of citizen reports using satellite, temporal, spatial, and CNN evidence.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200 self-start sm:self-center">
            STAGE 3: VERIFY
          </span>
        </div>

        {/* Backend Connection Error Banner if down */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Main Grid: Simulator Controls (Left) vs Mathematical Attribution (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Signal Adjustment Panel (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-navy-100 shadow-[var(--shadow-card)] p-5 space-y-5">
            <div className="flex items-center justify-between border-b border-navy-50 pb-2">
              <span className="text-sm font-bold text-navy-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-primary-500" />
                Input Signal Configuration
              </span>
              <span className="text-[11px] text-navy-400">Live API Tester</span>
            </div>

            {/* Signal 1: Hazard Type */}
            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1">
                Hazard Category
              </label>
              <select
                value={hazardType}
                onChange={(e) => setHazardType(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-navy-200 bg-white"
              >
                <option value="Flood">Flood / Waterlogging</option>
                <option value="Urban Fire">Urban / Wildfire</option>
                <option value="Landslide">Landslide / Rockfall</option>
                <option value="Building Collapse">Structural Collapse</option>
              </select>
            </div>

            {/* Signal 2: Satellite Detection Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-navy-50/60 border border-navy-100">
              <div className="flex items-center gap-2.5">
                <Radio className="w-4 h-4 text-primary-500" />
                <div>
                  <span className="text-xs font-bold text-navy-800 block">
                    Satellite Corroboration Hit
                  </span>
                  <span className="text-[10px] text-navy-500">
                    Matches NASA FIRMS thermal spot or GPM IMERG rainfall cell
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={hasSatelliteHit}
                onChange={(e) => setHasSatelliteHit(e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded"
              />
            </div>

            {/* Signal 3: Image Evidence & CNN Score */}
            <div className="p-3 rounded-lg bg-navy-50/60 border border-navy-100 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Camera className="w-4 h-4 text-primary-500" />
                  <div>
                    <span className="text-xs font-bold text-navy-800 block">
                      Supporting Photographic Proof
                    </span>
                    <span className="text-[10px] text-navy-500">
                      User uploaded ground image
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={hasPhoto}
                  onChange={(e) => setHasPhoto(e.target.checked)}
                  className="w-4 h-4 text-primary-600 rounded"
                />
              </div>

              {hasPhoto && (
                <div className="pt-2 border-t border-navy-100/80">
                  <div className="flex justify-between text-xs text-navy-600 mb-1">
                    <span>Simulated CNN Damage Detection Confidence:</span>
                    <strong className="text-navy-900">{(imageScore * 100).toFixed(0)}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="0.99"
                    step="0.01"
                    value={imageScore}
                    onChange={(e) => setImageScore(e.target.value)}
                    className="w-full accent-primary-500 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Signal 4: Spatial Density Corroboration */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-navy-700 mb-1">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-navy-400" />
                  Nearby Corroborating Reports (Within 5km)
                </span>
                <span className="text-primary-600 font-bold">{nearbyReports} reports</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={nearbyReports}
                onChange={(e) => setNearbyReports(e.target.value)}
                className="w-full accent-primary-500 cursor-pointer"
              />
            </div>

            {/* Signal 5: Weather Sensor Anomaly */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-navy-50/60 border border-navy-100">
              <div className="flex items-center gap-2.5">
                <CloudRain className="w-4 h-4 text-primary-500" />
                <div>
                  <span className="text-xs font-bold text-navy-800 block">
                    Local Weather Anomaly Triggered
                  </span>
                  <span className="text-[10px] text-navy-500">
                    High precipitation, wind speed, or seismic tremor detected
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={weatherAnomalyMatch}
                onChange={(e) => setWeatherAnomalyMatch(e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded"
              />
            </div>

            {/* Signal 6: Temporal Freshness */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-navy-700 mb-1">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-navy-400" />
                  Report Age (Minutes since incident occurred)
                </span>
                <span className="text-navy-900 font-mono">{minutesAgo}m ago</span>
              </div>
              <input
                type="range"
                min="2"
                max="180"
                step="2"
                value={minutesAgo}
                onChange={(e) => setMinutesAgo(e.target.value)}
                className="w-full accent-primary-500 cursor-pointer"
              />
            </div>

            {/* Evaluate Button */}
            <button
              onClick={handleRunEvaluation}
              disabled={loading}
              className="w-full py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white rounded-lg text-xs font-bold transition shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Computing Multi-Signal Confidence...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4" />
                  <span>Execute AI Truth Engine Verification</span>
                </>
              )}
            </button>
          </div>

          {/* RIGHT: Mathematical Attribution & Explanation (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {result ? (
              <div className="bg-white rounded-xl border border-navy-100 shadow-[var(--shadow-card)] p-5 space-y-5 animate-in fade-in duration-200">
                {/* Result Top Pill */}
                <div className="flex items-center justify-between border-b border-navy-50 pb-3">
                  <span className="text-xs font-bold text-navy-400 uppercase tracking-wider">
                    Reliability Assessment
                  </span>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      result.verification_status === 'Verified'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : result.verification_status === 'Pending Review'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}
                  >
                    {result.verification_status}
                  </span>
                </div>

                {/* Score Big Display */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-navy-50 to-primary-50/40 border border-navy-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-navy-500 font-medium block">
                      Aggregated Confidence Index:
                    </span>
                    <span className="text-4xl font-extrabold text-navy-900 tracking-tight">
                      {(result.confidence_score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-right max-w-xs">
                    <span className="text-[11px] font-semibold text-navy-700 block">
                      Recommendation:
                    </span>
                    <p className="text-[11px] text-navy-600 mt-0.5 leading-snug">
                      {result.recommendation}
                    </p>
                  </div>
                </div>

                {/* Mathematical Signal Attribution Decomposition */}
                <div>
                  <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-2.5">
                    Signal Contribution Decomposition
                  </h3>

                  <div className="space-y-3">
                    {Object.entries(result.signals).map(([key, val]) => {
                      const weight = result.weights_applied[key] || 0.2
                      const pct = (val * 100).toFixed(0)
                      return (
                        <div key={key} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium text-navy-700 capitalize">
                              {key.replace('_', ' ')}:
                            </span>
                            <span className="font-mono text-navy-500 text-[11px]">
                              {pct}% × {weight * 100}% weight
                            </span>
                          </div>
                          <div className="h-1.5 bg-navy-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary-500 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Human Oversight Mandatory Banner */}
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Human Review Rule:</strong> AI scores guide responder triage but do not automatically dismiss emergency reports. Emergency dispatchers retain manual override authority at all times.
                  </p>
                </div>
              </div>
            ) : (
              /* Empty Initial State */
              <div className="bg-white rounded-xl border border-dashed border-navy-200 p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center text-navy-400 mx-auto">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-navy-800">
                  Ready to Run Multi-Signal Verification
                </h3>
                <p className="text-xs text-navy-500 max-w-sm mx-auto leading-relaxed">
                  Adjust the disaster scenario signals on the left and click &quot;Execute AI Truth Engine Verification&quot; to test the Flask scoring engine.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
