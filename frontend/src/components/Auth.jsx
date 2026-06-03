import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLDClient } from 'launchdarkly-react-client-sdk'
import '../styles/Auth.css'

const API = 'http://localhost:8000'

export default function Auth() {
  const navigate = useNavigate()
  const ldClient = useLDClient()
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null) // { text, ok }
  const [loading, setLoading] = useState(false)

  const reset = (nextMode) => {
    setName('')
    setMessage(null)
    setMode(nextMode)
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      const data = await res.json()
      if (res.ok) {
        await ldClient.identify({
          kind: 'user',
          key: crypto.randomUUID(),
          name,
        })
        navigate('/dashboard')
        return
      }
      setMessage({ text: data.detail, ok: false })
    } catch {
      setMessage({ text: 'Could not reach the server.', ok: false })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="auth-mode-header">
        <h2 className="auth-mode-title">Welcome Back</h2>
      </div>

      <form onSubmit={submit} className="auth-form">
        <label className="auth-label">Name</label>
        <input
          className="auth-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          autoFocus
        />

{message && (
          <p className={`auth-message ${message.ok ? 'success' : 'error'}`}>
            {message.text}
          </p>
        )}

        <button className="auth-submit-btn" type="submit" disabled={loading}>
          {loading ? 'Please wait…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
