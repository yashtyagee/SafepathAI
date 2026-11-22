/**
 * WorkflowSection — visualizes SafePath AI's 5-stage pipeline:
 * PREDICT → DETECT → VERIFY → NAVIGATE → RESCUE
 *
 * Each stage is a card connected by arrows/lines.
 * This is the central concept of the platform,
 * so it must be visually compelling and easy to understand.
 *
 * Section id="workflow" enables smooth-scroll from navbar.
 */

import {
  BrainCircuit,
  ScanEye,
  ShieldCheck,
  Route,
  Siren,
  ArrowRight,
} from 'lucide-react'

const STAGES = [
  {
    step: '01',
    icon: BrainCircuit,
    title: 'Predict',
    subtitle: 'Risk Assessment',
    description:
      'Analyze environmental data, rainfall trends, and historical records to estimate current and future disaster risk.',
    color: 'from-primary-500 to-primary-600',
    lightColor: 'bg-primary-50 text-primary-600',
    dotColor: 'bg-primary-500',
  },
  {
    step: '02',
    icon: ScanEye,
    title: 'Detect',
    subtitle: 'Image Analysis',
    description:
      'Use CNN models to identify flooding, fire, smoke, and damage from satellite and aerial imagery.',
    color: 'from-danger-500 to-danger-600',
    lightColor: 'bg-danger-50 text-danger-600',
    dotColor: 'bg-danger-500',
  },
  {
    step: '03',
    icon: ShieldCheck,
    title: 'Verify',
    subtitle: 'AI Truth Engine',
    description:
      'Cross-reference citizen reports against spatial, temporal, and evidential signals to estimate reliability.',
    color: 'from-success-500 to-success-600',
    lightColor: 'bg-success-50 text-success-600',
    dotColor: 'bg-success-500',
  },
  {
    step: '04',
    icon: Route,
    title: 'Navigate',
    subtitle: 'Safe Routing',
    description:
      'Compute hazard-aware paths on road networks, dynamically penalizing blocked or dangerous segments.',
    color: 'from-info-500 to-blue-600',
    lightColor: 'bg-info-50 text-info-500',
    dotColor: 'bg-info-500',
  },
  {
    step: '05',
    icon: Siren,
    title: 'Rescue',
    subtitle: 'Response Priority',
    description:
      'Rank emergency requests by severity, urgency, and accessibility, and recommend appropriate shelters.',
    color: 'from-warning-500 to-warning-600',
    lightColor: 'bg-warning-50 text-warning-600',
    dotColor: 'bg-warning-500',
  },
]

function WorkflowSection() {
  return (
    <section id="workflow" className="py-20 lg:py-28 bg-navy-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary-600 bg-primary-50 rounded-[var(--radius-badge)] mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
            Five-Stage Intelligence Pipeline
          </h2>
          <p className="text-lg text-navy-500 leading-relaxed">
            Information flows through five interconnected stages — from
            environmental data collection to actionable emergency response.
          </p>
        </div>

        {/* Workflow stages */}
        <div className="relative">
          {/* Connection line (desktop only) */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary-200 via-warning-200 to-warning-200 z-0" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
            {STAGES.map((stage, index) => (
              <div key={stage.step} className="flex flex-col items-center">
                {/* Step number + icon circle */}
                <div className="relative mb-5">
                  <div
                    className={`w-[5.5rem] h-[5.5rem] rounded-2xl bg-gradient-to-br ${stage.color} flex items-center justify-center shadow-lg`}
                  >
                    <stage.icon className="w-8 h-8 text-white" />
                  </div>
                  {/* Step badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full border-2 border-navy-100 flex items-center justify-center">
                    <span className="text-[11px] font-bold text-navy-900">
                      {stage.step}
                    </span>
                  </div>
                </div>

                {/* Card */}
                <div className="text-center bg-white rounded-[var(--radius-card)] border border-navy-100 shadow-[var(--shadow-card)] p-5 w-full hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300">
                  <h3 className="text-lg font-bold text-navy-900 mb-0.5">
                    {stage.title}
                  </h3>
                  <span
                    className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-[var(--radius-badge)] ${stage.lightColor} mb-3`}
                  >
                    {stage.subtitle}
                  </span>
                  <p className="text-sm text-navy-500 leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {/* Arrow between cards (mobile/tablet) */}
                {index < STAGES.length - 1 && (
                  <div className="lg:hidden flex justify-center py-3">
                    <ArrowRight className="w-5 h-5 text-navy-300 rotate-90 sm:rotate-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkflowSection
