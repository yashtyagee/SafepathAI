import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CommandCenter from './pages/CommandCenter'
import DisasterMap from './pages/DisasterMap'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/command-center" element={<CommandCenter />} />
      <Route path="/map" element={<DisasterMap />} />
    </Routes>
  )
}

export default App
