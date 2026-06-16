import { useNavigate } from 'react-router-dom'
import BackButton from './BackButton'
import '../styles/About.css'

export default function About() {
  const navigate = useNavigate()

  return (
    <div className="about-page">
      <BackButton />
      <div className="about-card">
        <div className="about-badge">About Us</div>
        <h1 className="about-title">Launchcorp</h1>
        <p className="about-body">
          Launchcorp is a maze of code challenges, taking you to the win streak.
        </p>
        <button className="about-back-btn" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>
    </div>
  )
}
