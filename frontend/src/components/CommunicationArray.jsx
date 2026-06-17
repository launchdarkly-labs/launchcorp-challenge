import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLDClient } from 'launchdarkly-react-client-sdk'
import BackButton from './BackButton'
import PuzzleButton from './PuzzleButton'
import '../styles/CommunicationArray.css'

const CommArrayPuzzle = (
  <>
    <h2>Mission Control has encountered an encrypted series of messages.</h2>
    <p>
      Your team needs to decrypt the message, and send it as a variation value
      for the flag associated with the door.
    </p>
    <p>Check the Wordle challenge below to retrieve the decrypted variation value.</p>
  </>
)

const ACCEPTED_WORDLE_VARIATIONS = new Set([
  'NEBULA',
  'QUASAR',
  'PULSAR',
  'PHOTON',
  'AURORA',
  'COSMIC',
  'APOLLO',
  'GALAXY',
  'METEOR',
  'VOYAGE',
])

export default function CommunicationArray() {
  const navigate = useNavigate()
  const ldClient = useLDClient()
  const [error, setError] = useState(null)

  const proceedToMissionControl = () => {
    const value = ldClient.variation('wordle-variation', '')
    if (ACCEPTED_WORDLE_VARIATIONS.has(value)) {
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
      <div className="puzzle-actions">
        <PuzzleButton>{CommArrayPuzzle}</PuzzleButton>
        <button className="comm-array-proceed-btn" onClick={proceedToMissionControl}>
          Proceed To Mission Control Center
        </button>
      </div>
      {error && <p className="comm-array-error">{error}</p>}
    </div>
  )
}
