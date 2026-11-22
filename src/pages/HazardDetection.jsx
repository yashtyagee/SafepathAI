/**
 * HazardDetection — Computer Vision Image Hazard Classifier
 * Stage 2: DETECT
 *
 * Implements:
 * - Transfer learning CNN inference simulator (ResNet-50 / EfficientNet)
 * - Fine-tuned on FloodNet and xBD disaster imagery
 * - Multi-class probability decomposition
 * - Real API call to Flask: POST http://localhost:5000/api/detect-hazard
 */

import { useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import {
  ScanEye,
  Camera,
  UploadCloud,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Info,
  Droplets,
  Flame,
  Mountain,
  Building,
  CheckCircle2,
} from 'lucide-react'

// Realistic sample presets
const PRESET_SAMPLES = [
  {
    id: 'flood-road',
    name: 'Flooded Urban Arterial (FloodNet)',
    type: 'Flood',
    imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    description: 'Submerged dual-lane asphalt with standing water depth > 50cm.',
  },
  {
    id: 'fire-plume',
    name: 'Industrial Fire & Black Smoke',
    type: 'Fire',
    imageUrl: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=800&q=80',
    description: 'Heavy thermal combustion with dense atmospheric aerosol dispersal.',
  },
  {
    id: 'landslide-pass',
    name: 'Mountain Highway Debris Obstruction',
    type: 'Landslide',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    description: 'Mass rockfall severance on national transport corridor.',
  },
]

export default function HazardDetection() {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_SAMPLES[0])
  const [customImage, setCustomImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [detectionResult, setDetectionResult] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  // Trigger CNN inference
  const handleRunInference = async (hazardType = selectedPreset.type) => {
    setLoading(true)
    setErrorMsg(null)

    try {
      const res = await fetch('http://localhost:5000/api/detect-hazard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hazard_type: hazardType,
          image_reference: customImage || selectedPreset.imageUrl,
        }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setDetectionResult(data)
    } catch (err) {
      console.error(err)
      setErrorMsg('Could not reach Flask backend at http://localhost:5000/api/detect-hazard')
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
              Computer Vision Hazard Detection
            </h1>
            <p className="text-xs text-navy-500 mt-1">
              Automated image segmentation and damage classification using ResNet-50 transfer learning on disaster datasets.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-primary-50 text-primary-700 rounded-md border border-primary-200 self-start sm:self-center">
            STAGE 2: DETECT
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
            Select Evaluation Preset or Upload Ground Photograph:
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
                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition ${
                  selectedPreset?.id === p.id
                    ? 'border-primary-500 bg-primary-50 text-primary-800 shadow-xs'
                    : 'border-navy-200 text-navy-600 hover:bg-navy-50'
                }`}
              >
                {p.name}
              </button>
            ))}

            <label className="cursor-pointer px-3 py-2 rounded-lg text-xs font-semibold border border-dashed border-primary-400 text-primary-600 hover:bg-primary-50 flex items-center gap-1.5 transition">
              <Camera className="w-3.5 h-3.5" />
              <span>Upload Custom Photo</span>
              <input type="file" accept="image/*" onChange={handleCustomUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Main Grid: Image Viewer & Scan Frame (6 cols) vs CNN Probabilities (6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Image Frame with Scanning Overlay */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-navy-100 shadow-[var(--shadow-card)] p-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-navy-500 border-b border-navy-50 pb-2">
              <span className="font-semibold text-navy-800">Visual Feed Inspector</span>
              <span className="font-mono text-[11px]">RGB 512×512 Normalized</span>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-navy-900 border border-navy-200 h-72 sm:h-80 flex items-center justify-center">
              {activeImage ? (
                <>
                  <img
                    src={activeImage}
                    alt="Disaster Observation"
                    className="w-full h-full object-cover"
                  />
                  {/* Simulated Bounding Overlay if detection completed */}
                  {detectionResult && (
                    <div className="absolute inset-4 border-2 border-dashed border-red-500 rounded-lg pointer-events-none animate-in fade-in">
                      <div className="bg-red-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-br inline-block">
                        HAZARD CONTOUR: {(detectionResult.confidence_score * 100).toFixed(0)}% CONF
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-navy-400 text-xs">No image selected</div>
              )}
            </div>

            <button
              onClick={() => handleRunInference(selectedPreset?.type || 'Flood')}
              disabled={loading}
              className="w-full py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white rounded-lg text-xs font-bold transition shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Neural Backbone Layers...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4" />
                  <span>Run CNN Hazard Inference</span>
                </>
              )}
            </button>
          </div>

          {/* RIGHT: CNN Classification & Probability Decomposition */}
          <div className="lg:col-span-6 space-y-4">
            {detectionResult ? (
              <div className="bg-white rounded-xl border border-navy-100 shadow-[var(--shadow-card)] p-5 space-y-5 animate-in fade-in duration-200">
                {/* Result Tag */}
                <div className="flex items-center justify-between border-b border-navy-50 pb-3">
                  <span className="text-xs font-bold text-navy-400 uppercase">
                    CNN Classification Result
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                      detectionResult.detected_severity === 'Critical'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-orange-50 text-orange-700 border-orange-200'
                    }`}
                  >
                    {detectionResult.detected_severity} Severity
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-navy-50/70 border border-navy-100">
                  <span className="text-[10px] text-navy-400 font-bold uppercase block">
                    Primary Detected Class:
                  </span>
                  <strong className="text-base font-bold text-navy-900 block mt-0.5">
                    {detectionResult.primary_classification}
                  </strong>
                  <span className="text-xs font-mono font-bold text-primary-600 mt-1 inline-block">
                    Confidence: {(detectionResult.confidence_score * 100).toFixed(1)}%
                  </span>
                </div>

                {/* Class Probabilities Bars */}
                <div>
                  <h4 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-2.5">
                    Multi-Class Output Probabilities
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
                                prob > 0.6 ? 'bg-red-500' : prob > 0.3 ? 'bg-amber-500' : 'bg-primary-400'
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Model Metadata */}
                <div className="p-3 bg-navy-50 rounded-lg text-[11px] text-navy-600 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span>Backbone Architecture:</span>
                    <strong className="text-navy-900">{detectionResult.model_metadata.architecture}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Weights:</span>
                    <span className="text-navy-700">{detectionResult.model_metadata.weights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inference Latency:</span>
                    <span className="text-emerald-700 font-bold">{detectionResult.model_metadata.inference_time_ms} ms</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-dashed border-navy-200 p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center text-navy-400 mx-auto">
                  <ScanEye className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-navy-800">
                  Ready to Run CNN Hazard Detection
                </h3>
                <p className="text-xs text-navy-500 max-w-sm mx-auto leading-relaxed">
                  Select a disaster preset on the left and click &quot;Run CNN Hazard Inference&quot; to test our ResNet-50 visual damage classifier.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
