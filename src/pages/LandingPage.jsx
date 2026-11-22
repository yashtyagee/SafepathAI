/**
 * LandingPage — the public homepage of SafePath AI.
 *
 * This is a placeholder. We will build each section
 * (Navbar, Hero, Capabilities, Workflow, Map Preview,
 *  Response Preview, CTA, Footer) one at a time in
 *  upcoming tasks.
 */

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar will go here */}

      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-screen">
        <div className="text-center px-6">
          <h1 className="text-5xl font-bold text-navy-900 mb-4">
            SafePath AI
          </h1>
          <p className="text-xl text-navy-500 max-w-2xl mx-auto mb-8">
            Intelligent Disaster Prediction &amp; Emergency Response System
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-[var(--radius-button)] transition-colors duration-200">
              Get Started
            </button>
            <button className="border-2 border-primary-500 text-primary-500 hover:bg-primary-50 font-semibold px-8 py-3 rounded-[var(--radius-button)] transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Capabilities section will go here */}
      {/* Workflow section will go here */}
      {/* Map Preview section will go here */}
      {/* Response Preview section will go here */}
      {/* CTA section will go here */}
      {/* Footer will go here */}
    </div>
  )
}

export default LandingPage
