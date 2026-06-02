import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Dashboard from './components/Dashboard'
import Castle from './components/Castle'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/castle" element={<Castle />} />
    </Routes>
  )
}
