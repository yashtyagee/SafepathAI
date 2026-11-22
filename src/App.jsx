import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CommandCenter from './pages/CommandCenter'
import DisasterMap from './pages/DisasterMap'
import ReportIncident from './pages/ReportIncident'
import VerificationConsole from './pages/VerificationConsole'
import RoutePlanner from './pages/RoutePlanner'
import RescueOperations from './pages/RescueOperations'
import RiskAnalytics from './pages/RiskAnalytics'
import HazardDetection from './pages/HazardDetection'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/command-center" element={<CommandCenter />} />
      <Route path="/map" element={<DisasterMap />} />
      <Route path="/risk-analytics" element={<RiskAnalytics />} />
      <Route path="/hazard-detection" element={<HazardDetection />} />
      <Route path="/report-incident" element={<ReportIncident />} />
      <Route path="/verification" element={<VerificationConsole />} />
      <Route path="/route-planner" element={<RoutePlanner />} />
      <Route path="/rescue-operations" element={<RescueOperations />} />
    </Routes>
  )
}

export default App
