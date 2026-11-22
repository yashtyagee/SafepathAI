import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CommandCenter from './pages/CommandCenter'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/command-center" element={<CommandCenter />} />
    </Routes>
  )
}

export default App
