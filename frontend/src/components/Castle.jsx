import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLDClient } from 'launchdarkly-react-client-sdk'
import confetti from 'canvas-confetti'
import '../styles/Castle.css'

function Bats() {
  return Array.from({ length: 10 }, (_, i) => (
    <span key={i} className="bat" style={{
      left: `${Math.random() * 90}%`,
      animationDuration: `${2 + Math.random() * 3}s`,
      animationDelay: `${Math.random() * 2}s`,
      fontSize: `${1.2 + Math.random() * 1.5}rem`,
    }}>🦇</span>
  ))
}

function Fairy() {
  return (
    <div className="castle-fairy-wrap">
      <img src="/fairy_transparent.svg" alt="fairy" className="castle-fairy" />
      {[...Array(6)].map((_, i) => (
        <span key={i} className={`fairy-sparkle fairy-sparkle-${i}`}>✦</span>
      ))}
    </div>
  )
}

function CastlePage({ navigate }) {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    })
  }, [])

  return (
    <div className="castle-page">
      <Fairy />
      <div className="castle-card">
        <img
          src="/magical_castle_garden.svg"
          alt="castle"
          className="castle-illustration"
        />
        <h1 className="castle-title">Welcome To The Castle</h1>
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

function DungeonPage({ navigate }) {
  return (
    <div className="castle-page">
      <Bats />
      <span className="cobweb cobweb-tl">🕸️</span>
      <span className="cobweb cobweb-tr">🕸️</span>
      <span className="cobweb cobweb-bl">🕸️</span>
      <span className="cobweb cobweb-br">🕸️</span>
      <div className="castle-card">
        <img
          src="/demonic_dungeon_fire.svg"
          alt="dungeon"
          className="castle-illustration"
        />
        <h1 className="castle-title">OH No! You Found The Dungeon</h1>
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

export default function Castle() {
  const navigate = useNavigate()
  const ldClient = useLDClient()

  const isCastle = ldClient.variation('switch-castle-dungeon', false)

  return isCastle ? <CastlePage navigate={navigate} /> : <DungeonPage navigate={navigate} />
}
