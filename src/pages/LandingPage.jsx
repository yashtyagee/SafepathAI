/**
 * LandingPage — the public homepage of SafePath AI.
 *
 * Assembles all landing-page sections in the planned order:
 *   Navbar → Hero → Features → Workflow → Response → CTA → Footer
 */

import Navbar from '../components/landing/Navbar'
import HeroSection from '../components/landing/HeroSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import WorkflowSection from '../components/landing/WorkflowSection'
import ResponseSection from '../components/landing/ResponseSection'
import CTASection from '../components/landing/CTASection'
import Footer from '../components/landing/Footer'

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <ResponseSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default LandingPage
