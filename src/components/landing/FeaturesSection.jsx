/**
 * FeaturesSection — showcases SafePath AI's six core capabilities
 * in a responsive card grid.
 *
 * Each card has:
 * - A colored icon container
 * - Title and description
 * - Hover lift animation
 *
 * Section id="features" enables smooth-scroll from navbar.
 */

import {
  BrainCircuit,
  ScanEye,
  ShieldCheck,
  Route,
  Siren,
  MapPinned,
} from 'lucide-react'

const FEATURES = [
  {
    icon: BrainCircuit,
    title: 'Risk Prediction',
    description:
      'Machine learning models analyze rainfall, environmental data, and historical patterns to estimate current and short-term disaster risk across monitored regions.',
    color: 'bg-primary-50 text-primary-500',
    border: 'border-primary-100',
  },
  {
    icon: ScanEye,
    title: 'Hazard Detection',
    description:
      'Pretrained CNN models identify flooding, fire, smoke, and structural damage from satellite and aerial imagery using transfer learning on disaster datasets.',
    color: 'bg-danger-50 text-danger-500',
    border: 'border-red-100',
  },
  {
    icon: ShieldCheck,
    title: 'AI Truth Engine',
    description:
      'Multi-signal verification estimates the reliability of citizen reports by cross-referencing location, timing, corroboration, image evidence, and weather data.',
    color: 'bg-success-50 text-success-500',
    border: 'border-green-100',
  },
  {
    icon: Route,
    title: 'Hazard-Aware Routing',
    description:
      'Graph-based pathfinding on OpenStreetMap road networks with dynamic hazard penalties suggests safer routes, avoiding flooded or blocked road segments.',
    color: 'bg-info-50 text-info-500',
    border: 'border-blue-100',
  },
  {
    icon: Siren,
    title: 'Rescue Prioritization',
    description:
      'Explainable rule-based scoring ranks emergency requests by hazard severity, affected population, medical urgency, and accessibility to support response teams.',
    color: 'bg-warning-50 text-warning-500',
    border: 'border-amber-100',
  },
  {
    icon: MapPinned,
    title: 'Shelter Intelligence',
    description:
      'Identifies suitable shelters based on proximity, capacity, operational status, accessibility, and distance from predicted hazard zones.',
    color: 'bg-purple-50 text-purple-500',
    border: 'border-purple-100',
  },
]

function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary-600 bg-primary-50 rounded-[var(--radius-badge)] mb-4">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
            Integrated Disaster Intelligence
          </h2>
          <p className="text-lg text-navy-500 leading-relaxed">
            Six interconnected modules that work together to predict threats,
            verify reports, guide navigation, and prioritize emergency response.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className={`group relative p-6 lg:p-8 rounded-[var(--radius-card)] bg-white border ${feature.border} shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-5`}
              >
                <feature.icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-navy-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-navy-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
