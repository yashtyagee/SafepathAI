/**
 * CTASection — final call-to-action before the footer.
 * Encourages users to explore the map or report an incident.
 */

import { Link } from 'react-router-dom'
import { ArrowRight, Shield } from 'lucide-react'

function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900 px-8 py-16 sm:px-16 sm:py-20 text-center">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-info-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Icon */}
            <div className="mx-auto w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center mb-8">
              <Shield className="w-8 h-8 text-primary-300" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Be Part of the Response
            </h2>
            <p className="text-lg text-navy-300 mb-10 leading-relaxed">
              Whether you're a citizen reporting a hazard, a rescue team
              coordinating operations, or an authority monitoring the
              situation — SafePath AI provides the intelligence you need.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/map"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary-500 hover:bg-primary-400 rounded-[var(--radius-button)] transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Explore the Map
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/report-incident"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border-2 border-white/20 hover:border-white/40 hover:bg-white/5 rounded-[var(--radius-button)] transition-all duration-200"
              >
                Report an Incident
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
