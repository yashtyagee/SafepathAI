/**
 * HazardDetection — Computer Vision Image Hazard Classifier
 * Stage 2: DETECT
 *
 * Genuine Computer Vision Analysis:
 * Decodes the uploaded image and extracts physical spectral masks
 * (fire thermal thresholds, water inundation absorption, smoke haziness, Laplacian rubble variance).
 * No hallucinations — non-disaster images produce near-zero hazard scores!
 */

import { useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import {
  ScanEye,
  Camera,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Info,
  Droplets,
  Flame,
  Mountain,
  CheckCircle2,
  Activity,
  Layers,
} from 'lucide-react'

// Curated presets including a non-disaster baseline to verify zero-hallucination!
const PRESET_SAMPLES = [
  {
    id: 'flood-road',
    name: 'Flooded Roadway (Real Flood)',
    imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    hint: 'High water pixel coverage',
  },
  {
    id: 'fire-plume',
    name: 'Industrial Fire (Real Fire & Smoke)',
    imageUrl: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80',
    hint: 'High red/thermal saturation',
  },
  {
    id: 'clear-street',
    name: 'Normal Sunny Street (Zero Disaster Baseline)',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80',
    hint: 'Tests zero-hallucination accuracy',
  },
]

export default function HazardDetection() {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_SAMPLES[0])
  const [customImage, setCustomImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [detectionResult, setDetectionResult] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  // Trigger Genuine Computer Vision Processing
  const handleRunInference = async () => {
    const imgPayload = customImage || selectedPreset?.imageUrl
    if (!imgPayload) {
      setErrorMsg('Please select or upload an image first.')
      return
    }

    setLoading(true)
    setErrorMsg(null)

    try {
      const res = await fetch('http://localhost:5000/api/detect-hazard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_reference: imgPayload,
        }),
      })

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}))
        throw new Error(errJson.message || `HTTP ${res.status}`)
      }

      const data = await res.json()
      setDetectionResult(data)
    } catch (err) {
      console.error(err)
      setErrorMsg(
        err.message || 'Could not reach Flask backend at http://localhost:5000. Ensure "python app.py" is running.'
      )
    } finally {
      setLoading(false)
    }
  }

  // Handle custom upload
  const handleCustomUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCustomImage(reader.result)
        setSelectedPreset(null)
        setDetectionResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const activeImage = customImage || selectedPreset?.imageUrl

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-navy-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2">
              <ScanEye className="w-6 h-6 text-primary-500" />
              Genuine Computer Vision Hazard Scanner
            </h1>
            <p className="text-xs text-navy-500 mt-1">
              Physical pixel decomposition: OpenCV spectral mask analysis, thermal thresholds, and rubble edge entropy.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200 self-start sm:self-center">
            ZERO HALLUCINATION ENGINE
          </span>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
            {errorMsg}
          </div>
        )}

        {/* Preset Selector */}
        <div className="bg-white p-4 rounded-xl border border-navy-100 shadow-[var(--shadow-card)] space-y-2">
          <span className="text-xs font-bold text-navy-700 block">
            Select Evaluation Preset or Upload Any Ground Photograph from Your Device:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_SAMPLES.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPreset(p)
                  setCustomImage(null)
                  setDetectionResult(null)
                }}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition text-left ${
                  selectedPreset?.id === p.id
                    ? 'border-primary-500 bg-primary-50 text-primary-800 shadow-xs'
                    : 'border-navy-200 text-navy-600 hover:bg-navy-50'
                }`}
              >
                <div>{p.name}</div>
                <div className="text-[10px] text-navy-400 font-normal">{p.hint}</div>
              </button>
            ))}

            <label className="cursor-pointer px-4 py-2 rounded-lg text-xs font-semibold border border-dashed border-primary-400 text-primary-600 hover:bg-primary-50 flex items-center gap-1.5 transition">
              <Camera className="w-4 h-4" />
              <span>Upload Custom Photo</span>
              <input type="file" accept="image/*" onChange={handleCustomUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Main Grid: Image Viewer (6 cols) vs Genuine CV Probabilities (6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Image Frame */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-navy-100 shadow-[var(--shadow-card)] p-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-navy-500 border-b border-navy-50 pb-2">
              <span className="font-semibold text-navy-800">Visual Input Frame</span>
              <span className="font-mono text-[11px]">Normalized 512×512 BGR Tensor</span>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-navy-950 border border-navy-200 h-72 sm:h-80 flex items-center justify-center">
              {activeImage ? (
                <>
                  <img
                    src={activeImage}
                    alt="Target Observation"
                    className="w-full h-full object-cover"
                  />
                  {detectionResult && (
                    <div
                      className={`absolute inset-3 border-2 border-dashed rounded-lg pointer-events-none animate-in fade-in ${
                        detectionResult.confidence_score > 0.4
                          ? 'border-red-500'
                          : 'border-emerald-500'
                      }`}
                    >
                      <div
                        className={`text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-br inline-block ${
                          detectionResult.confidence_score > 0.4
                            ? 'bg-red-600'
                            : 'bg-emerald-600'
                        }`}
                      >
                        {detectionResult.confidence_score > 0.4
                          ? `HAZARD DETECTED: ${(detectionResult.confidence_score * 100).toFixed(0)}%`
                          : `CLEAN SCENE: NORMAL`}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-navy-400 text-xs">No image loaded</div>
              )}
            </div>

            <button
              onClick={handleRunInference}
              disabled={loading}
              className="w-full py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white rounded-lg text-xs font-bold transition shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning Physical Pixels via OpenCV...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4" />
                  <span>Analyze Physical Pixels (Real CV)</span>
                </>
              )}
            </button>
          </div>

          {/* RIGHT: Genuine Computer Vision Results */}
          <div className="lg:col-span-6 space-y-4">
            {detectionResult ? (
              <div className="bg-white rounded-xl border border-navy-100 shadow-[var(--shadow-card)] p-5 space-y-5 animate-in fade-in duration-200">
                {/* Result Tag */}
                <div className="flex items-center justify-between border-b border-navy-50 pb-3">
                  <span className="text-xs font-bold text-navy-400 uppercase">
                    Spectral &amp; Edge Evaluation
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                      detectionResult.detected_severity.includes('Critical')
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : detectionResult.detected_severity.includes('High')
                        ? 'bg-orange-50 text-orange-700 border-orange-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {detectionResult.detected_severity}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-navy-50/70 border border-navy-100">
                  <span className="text-[10px] text-navy-400 font-bold uppercase block">
                    Classification Output:
                  </span>
                  <strong className="text-base font-bold text-navy-900 block mt-0.5">
                    {detectionResult.primary_classification}
                  </strong>
                  <span className="text-xs font-mono font-bold text-primary-600 mt-1 inline-block">
                    Peak Hazard Metric: {(detectionResult.confidence_score * 100).toFixed(0)}%
                  </span>
                </div>

                {/* Class Probabilities Bars */}
                <div>
                  <h4 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-2.5">
                    Extracted Physical Hazard Indicators
                  </h4>

                  <div className="space-y-3">
                    {Object.entries(detectionResult.class_probabilities).map(([cKey, prob]) => {
                      const pct = (prob * 100).toFixed(0)
                      return (
                        <div key={cKey} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium text-navy-700 capitalize">
                              {cKey.replace(/_/g, ' ')}:
                            </span>
                            <span className="font-mono text-navy-900 font-bold text-[11px]">
                              {pct}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-navy-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                prob > 0.5 ? 'bg-red-500' : prob > 0.2 ? 'bg-amber-500' : 'bg-navy-300'
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Genuine Physical Pixel Metrics Extracted by OpenCV */}
                {detectionResult.physical_metrics && (
                  <div className="p-3 bg-navy-50/80 rounded-lg text-xs space-y-1.5 border border-navy-100">
                    <span className="font-bold text-navy-800 text-[11px] block uppercase">
                      Physical OpenCV Measurements:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-navy-600">
                      <div>Fire Pixels: {(detectionResult.physical_metrics.fire_pixel_ratio * 100).toFixed(2)}%</div>
                      <div>Water Pixels: {(detectionResult.physical_metrics.water_pixel_ratio * 100).toFixed(2)}%</div>
                      <div>Smoke Haze: {(detectionResult.physical_metrics.smoke_pixel_ratio * 100).toFixed(2)}%</div>
                      <div>Laplacian Var: {detectionResult.physical_metrics.laplacian_variance}</div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-dashed border-navy-200 p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center text-navy-400 mx-auto">
                  <ScanEye className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-navy-800">
                  Ready to Inspect Image Pixels
                </h3>
                <p className="text-xs text-navy-500 max-w-sm mx-auto leading-relaxed">
                  Upload an image of a non-disaster scene or select one of the presets to test zero-hallucination accuracy.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
