import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLDClient } from 'launchdarkly-react-client-sdk'
import BackButton from './BackButton'
import PuzzleButton from './PuzzleButton'
import '../styles/EngineRoom.css'

const REQUIRED_ON_FLAGS = [
  'fuel-system',
  'navigation-core',
  'life-support',
  'shield-generator',
  'thruster-control',
]

const REQUIRED_OFF_FLAGS = [
  'communications-array',
  'docking-clamps',
]

const EngineRoomPuzzle = (
  <>
    <h2>Mission Control has received fragmented status reports.</h2>
    <p>Configure each spacecraft system correctly before launch.</p>
    <h3>Crew Reports</h3>
    <dl className="crew-reports">
      <dt>Flight Engineer</dt>
      <dd>Fuel System and Navigation Core always share the same state.</dd>
      <dt>Mission Commander</dt>
      <dd>The Fuel System is active.</dd>
      <dt>Communications Officer</dt>
      <dd>Communications Array and Shield Generator cannot both be active.</dd>
      <dt>Medical Officer</dt>
      <dd>Life Support shares the same state as Fuel System.</dd>
      <dt>Propulsion Officer</dt>
      <dd>Thruster Control shares the same state as Navigation Core.</dd>
      <dt>Launch Director</dt>
      <dd>If Communications Array is active, Navigation Core must be inactive.</dd>
      <dt>Ground Operations</dt>
      <dd>Docking Clamps operate opposite to the Shield Generator.</dd>
      <dt>Systems Analyst</dt>
      <dd>Exactly five systems should be active for launch.</dd>
    </dl>
  </>
)

export default function EngineRoom() {
  const navigate = useNavigate()
  const ldClient = useLDClient()
  const [error, setError] = useState(null)

  const proceedToCommArray = () => {
    const allOn = REQUIRED_ON_FLAGS.every((key) => ldClient.variation(key, false) === true)
    const allOff = REQUIRED_OFF_FLAGS.every((key) => ldClient.variation(key, false) === false)
    if (allOn && allOff) {
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
      <div className="puzzle-actions">
        <PuzzleButton>{EngineRoomPuzzle}</PuzzleButton>
        <button className="engine-room-proceed-btn" onClick={proceedToCommArray}>
          Proceed to Communication Array
        </button>
      </div>
      {error && <p className="engine-room-error">{error}</p>}
    </div>
  )
}
