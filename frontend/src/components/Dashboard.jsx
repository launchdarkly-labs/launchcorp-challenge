import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLDClient } from 'launchdarkly-react-client-sdk'
import BackButton from './BackButton'
import '../styles/Dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const ldClient = useLDClient()
  const [error, setError] = useState(null)

  const enterAirlock = () => {
    const allowed = ldClient.variation('allow_airlock_room', false)
    if (allowed) {
      navigate('/airlock')
    } else {
      setError('Entry Denied')
    }
  }

  return (
    <div className="dashboard-page">
      <BackButton />
      <button className="dashboard-click-btn" onClick={enterAirlock}>
        Enter The Airlock Room
      </button>
      {error && <p className="dashboard-error">{error}</p>}
    </div>
  )
}
