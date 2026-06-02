import { useNavigate } from 'react-router-dom'
import Auth from './Auth'
import '../styles/Home.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <div className="home-card">
        <h1 className="home-title">Launchcorp</h1>
        <p className="home-subtitle">Your gateway to the challenge</p>

        <Auth />

        <div className="home-divider" />

        <button className="home-know-more-btn" onClick={() => navigate('/about')}>
          Know more about Launchcorp
        </button>
      </div>
    </div>
  )
}
