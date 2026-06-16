import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLDClient } from 'launchdarkly-react-client-sdk'
import BackButton from './BackButton'
import '../styles/EngineRoom.css'

const COMM_ARRAY_FLAGS = ['Flag-1', 'Flag-2', 'Flag-3', 'Flag-4', 'Flag-5']

export default function EngineRoom() {
  const navigate = useNavigate()
  const ldClient = useLDClient()
  const [error, setError] = useState(null)

  const proceedToCommArray = () => {
    const allOn = COMM_ARRAY_FLAGS.every((key) => ldClient.variation(key, false) === true)
    if (allOn) {
      navigate('/communication-array')
    } else {
      setError('Access Denied')
    }
  }

  return (
    <div className="engine-room-page">
      <BackButton />
      <h1 className="engine-room-title">Welcome to Engine Room</h1>
      <img
        src="/engine_room_3d.svg"
        alt="engine room"
        className="engine-room-illustration"
      />
      <button className="engine-room-proceed-btn" onClick={proceedToCommArray}>
        Proceed to Communication Array
      </button>
      {error && <p className="engine-room-error">{error}</p>}
    </div>
  )
}
