import { Routes, Route, Navigate } from 'react-router-dom'
import About from './components/About'
import Dashboard from './components/Dashboard'
import Airlock from './components/Airlock'
import EngineRoom from './components/EngineRoom'
import CommunicationArray from './components/CommunicationArray'
import MissionControl from './components/MissionControl'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/airlock" replace />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/airlock" element={<Airlock />} />
      <Route path="/engine-room" element={<EngineRoom />} />
      <Route path="/communication-array" element={<CommunicationArray />} />
      <Route path="/mission-control" element={<MissionControl />} />
    </Routes>
  )
}
