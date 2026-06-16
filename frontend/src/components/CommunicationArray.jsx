import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLDClient } from 'launchdarkly-react-client-sdk'
import BackButton from './BackButton'
import '../styles/CommunicationArray.css'

export default function CommunicationArray() {
  const navigate = useNavigate()
  const ldClient = useLDClient()
  const [error, setError] = useState(null)

  const proceedToMissionControl = () => {
    const allowed = ldClient.variation('allow_mission_control', false)
    if (allowed) {
      navigate('/mission-control')
    } else {
      setError('Access Denied')
    }
  }

  return (
    <div className="comm-array-page">
      <BackButton />
      <h1 className="comm-array-title">Welcome to the Communication Array</h1>
      <img
        src="/comm_array_room_3d.svg"
        alt="communication array"
        className="comm-array-illustration"
      />
      <button className="comm-array-proceed-btn" onClick={proceedToMissionControl}>
        Proceed To Mission Control Center
      </button>
      {error && <p className="comm-array-error">{error}</p>}
    </div>
  )
}
