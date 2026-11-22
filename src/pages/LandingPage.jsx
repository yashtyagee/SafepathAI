/**
 * LandingPage — the public homepage of SafePath AI.
 *
 * Assembles all landing-page sections in order.
 * Each section is a separate component for maintainability.
 */

import Navbar from '../components/landing/Navbar'
import HeroSection from '../components/landing/HeroSection'

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />

      {/* Upcoming sections — will be built in subsequent tasks:
          - FeaturesSection    (#features)
          - WorkflowSection    (#workflow)
          - MapPreviewSection  (#map-preview)
          - ResponseSection    (#response)
          - CTASection
          - Footer
      */}
    </div>
  )
}

export default LandingPage
