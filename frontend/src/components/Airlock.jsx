import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLDClient } from 'launchdarkly-react-client-sdk'
import BackButton from './BackButton'
import PuzzleButton from './PuzzleButton'
import '../styles/Airlock.css'

const AirlockPuzzle = (
  <>
    <h2>Mission Control has lost access to the launch systems in the airlock.</h2>
    <p>A transmission has been intercepted:</p>
    <pre className="puzzle-code">{`21 22 26 7 6 9 22
21 15 26 20`}</pre>
    <p>
      Create a LaunchDarkly flag using the decoded answer as the flag key to
      restore access to Mission Control.
    </p>
    <p className="puzzle-note">
      Note: The flag should be all lowercase separated with a hyphen (e.g.
      example-key)
    </p>
  </>
)

export default function Airlock() {
  const navigate = useNavigate()
  const ldClient = useLDClient()
  const [error, setError] = useState(null)

  const proceedToEngineRoom = () => {
    const value = ldClient.variation('feature-flag', '')
    if (value === true) {
      navigate('/engine-room')
    } else {
      setError('Entry Denied')
    }
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
      <div className="puzzle-actions">
        <PuzzleButton>{AirlockPuzzle}</PuzzleButton>
        <button className="airlock-proceed-btn" onClick={proceedToEngineRoom}>
          Proceed to Engine Room
        </button>
      </div>
      {error && <p className="airlock-error">{error}</p>}
      <button className="airlock-signout-btn" onClick={() => window.location.reload()}>
        Sign Out
      </button>
    </div>
  )
}
