import { useState } from 'react'
import '../styles/Home.css'
import '../styles/Auth.css'

const API = 'http://localhost:8000'

export default function ClientIdLogin({ onSubmit, loading, error: ldError }) {
  const [clientId, setClientId] = useState('')
  const [validating, setValidating] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = clientId.trim()
    setValidating(true)
    setError(null)

    try {
      const res = await fetch(`${API}/validate-client-id`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: id }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.detail || 'Invalid client-side ID.')
        setValidating(false)
        return
      }
    } catch {
      setError('Could not reach the server.')
      setValidating(false)
      return
    }

    // Validation passed — hand off to Root to initialise LD
    await onSubmit(id)
    setValidating(false)
  }

  const busy = validating || loading
  const displayError = error || ldError

  return (
    <div className="home-page">
      <div className="home-card">
        <h1 className="home-title">Launchcorp</h1>
        <p className="home-subtitle">Your gateway to the challenge</p>

        <div className="auth-mode-header">
          <h2 className="auth-mode-title">Welcome Back</h2>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-label">LaunchDarkly Client-side ID</label>
          <input
            className="auth-input"
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder="6a1511b0…"
            required
            autoFocus
            disabled={busy}
          />

          {displayError && (
            <p className="auth-message error">{displayError}</p>
          )}

          <button className="auth-submit-btn" type="submit" disabled={busy}>
            {validating ? 'Validating…' : loading ? 'Connecting…' : 'Launch'}
          </button>
        </form>
      </div>
    </div>
  )
}
