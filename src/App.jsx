import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CommandCenter from './pages/CommandCenter'
import DisasterMap from './pages/DisasterMap'
import ReportIncident from './pages/ReportIncident'
import VerificationConsole from './pages/VerificationConsole'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/command-center" element={<CommandCenter />} />
      <Route path="/map" element={<DisasterMap />} />
      <Route path="/report-incident" element={<ReportIncident />} />
      <Route path="/verification" element={<VerificationConsole />} />
    </Routes>
  )
}

export default App
