import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLDClient } from 'launchdarkly-react-client-sdk'
import confetti from 'canvas-confetti'
import '../styles/Castle.css'

export default function Castle() {
  const navigate = useNavigate()
  const ldClient = useLDClient()

  const isCastle = ldClient.variation('switch-castle-dungeon', false)

  useEffect(() => {
    if (isCastle) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      })
    }
  }, [isCastle])
  const icon     = isCastle ? '🏰' : '🏚️'
  const message  = isCastle ? 'Welcome To The Castle' : 'OH No! You Found The Dungeon'

  const bats = !isCastle
    ? Array.from({ length: 10 }, (_, i) => (
        <span key={i} className="bat" style={{
          left: `${Math.random() * 90}%`,
          animationDuration: `${2 + Math.random() * 3}s`,
          animationDelay: `${Math.random() * 2}s`,
          fontSize: `${1.2 + Math.random() * 1.5}rem`,
        }}>🦇</span>
      ))
    : null

  return (
    <div className="castle-page">
      {bats}
      {!isCastle && (
        <>
          <span className="cobweb cobweb-tl">🕸️</span>
          <span className="cobweb cobweb-tr">🕸️</span>
          <span className="cobweb cobweb-bl">🕸️</span>
          <span className="cobweb cobweb-br">🕸️</span>
        </>
      )}
      <div className="castle-card">
        <div className="castle-icon">{icon}</div>
        <h1 className="castle-title">{message}</h1>
        <button className="castle-home-btn" onClick={() => navigate('/dashboard')}>
          Go To Home
        </button>
        <button className="castle-signout-btn" onClick={() => navigate('/')}>
          Sign Out
        </button>
      </div>
    </div>
  )
}
