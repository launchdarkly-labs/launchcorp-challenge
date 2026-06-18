import { useNavigate } from 'react-router-dom'
import BackButton from './BackButton'
import '../styles/MissionControl.css'

function Spaceships() {
  return Array.from({ length: 12 }, (_, i) => (
    <span
      key={i}
      className="spaceship"
      style={{
        top: `${Math.random() * 80}%`,
        animationDuration: `${5 + Math.random() * 6}s`,
        animationDelay: `${Math.random() * 4}s`,
        fontSize: `${1.4 + Math.random() * 2}rem`,
      }}
    >
      🚀
    </span>
  ))
}

function Sparkles() {
  return Array.from({ length: 24 }, (_, i) => (
    <span
      key={i}
      className="celebration-sparkle"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${1 + Math.random() * 1.8}s`,
        animationDelay: `${Math.random() * 2}s`,
        fontSize: `${0.6 + Math.random() * 1}rem`,
      }}
    >
      ✦
    </span>
  ))
}

export default function MissionControl() {
  const navigate = useNavigate()

  return (
    <div className="mission-control-page">
      <BackButton />
      <Spaceships />
      <Sparkles />
      <h1 className="mission-control-title">
        Congratulations, You reached your Final Destination
      </h1>
      <img
        src="/mission_control_3d.svg"
        alt="mission control"
        className="mission-control-illustration"
      />
      <button className="mission-control-home-btn" onClick={() => window.location.reload()}>
        Go Home
      </button>
    </div>
  )
}
