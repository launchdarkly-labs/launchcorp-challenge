import { useNavigate } from 'react-router-dom'
import { useLDClient } from 'launchdarkly-react-client-sdk'
import '../styles/Castle.css'

export default function Castle() {
  const navigate = useNavigate()
  const ldClient = useLDClient()

  const isCastle = ldClient.variation('switch-castle-dungeon', false)
  const icon     = isCastle ? '🏰' : '🏚️'
  const message  = isCastle ? 'Enter The Castle' : 'Enter The Dungeon'

  return (
    <div className="castle-page">
      <div className="castle-card">
        <div className="castle-icon">{icon}</div>
        <h1 className="castle-title">{message}</h1>
        <button className="castle-home-btn" onClick={() => navigate('/')}>
          Go To Home
        </button>
      </div>
    </div>
  )
}
