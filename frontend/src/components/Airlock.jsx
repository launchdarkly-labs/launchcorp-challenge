import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLDClient } from 'launchdarkly-react-client-sdk'
import BackButton from './BackButton'
import '../styles/Airlock.css'

export default function Airlock() {
  const navigate = useNavigate()
  const ldClient = useLDClient()
  const allowed = ldClient.variation('allow_airlock_room', false)
  const [error, setError] = useState(null)

  const proceedToEngineRoom = () => {
    const value = ldClient.variation('engine_room_access', '')
    if (value === 'You Are Ready') {
      navigate('/engine-room')
    } else {
      setError('Entry Denied')
    }
  }

  if (!allowed) {
    return (
      <div className="airlock-page">
        <BackButton />
        <h1 className="airlock-title airlock-denied-title">Entry Denied</h1>
        <button className="airlock-proceed-btn" onClick={() => navigate('/dashboard')}>
          Go To Home
        </button>
      </div>
    )
  }

  return (
    <div className="airlock-page">
      <BackButton />
      <h1 className="airlock-title">Welcome To The Airlock Room</h1>
      <img
        src="/airlock_room.svg"
        alt="airlock room"
        className="airlock-illustration"
      />
      <button className="airlock-proceed-btn" onClick={proceedToEngineRoom}>
        Proceed to Engine Room
      </button>
      {error && <p className="airlock-error">{error}</p>}
      <button className="airlock-signout-btn" onClick={() => navigate('/')}>
        Sign Out
      </button>
    </div>
  )
}
