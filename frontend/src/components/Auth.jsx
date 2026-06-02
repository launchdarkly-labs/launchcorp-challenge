import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLDClient } from 'launchdarkly-react-client-sdk'
import '../styles/Auth.css'

const API = 'http://localhost:8000'

export default function Auth() {
  const navigate = useNavigate()
  const ldClient = useLDClient()
  const [mode, setMode] = useState(null)       // null | 'register' | 'login'
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null) // { text, ok }
  const [loading, setLoading] = useState(false)

  const reset = (nextMode) => {
    setName('')
    setPassword('')
    setMessage(null)
    setMode(nextMode)
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const endpoint = mode === 'register' ? '/register' : '/login'
    try {
      const res = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
      })
      const data = await res.json()
      if (res.ok && mode === 'login') {
        await ldClient.identify({
          kind: 'user',
          key: crypto.randomUUID(),
          name,
        })
        navigate('/dashboard')
        return
      }
      if (res.ok && mode === 'register') {
        reset('login')
        setMessage({ text: 'Account created! Please sign in.', ok: true })
        return
      }
      setMessage({ text: res.ok ? data.message : data.detail, ok: res.ok })
    } catch {
      setMessage({ text: 'Could not reach the server.', ok: false })
    } finally {
      setLoading(false)
    }
  }

  if (!mode) {
    return (
      <div className="auth-btn-row">
        <button className="auth-primary-btn" onClick={() => reset('register')}>
          Register
        </button>
        <button className="auth-secondary-btn" onClick={() => reset('login')}>
          Sign In
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="auth-mode-header">
        <h2 className="auth-mode-title">
          {mode === 'register' ? 'Create Account' : 'Welcome Back'}
        </h2>
        <button className="auth-switch-link" onClick={() => reset(mode === 'register' ? 'login' : 'register')}>
          {mode === 'register' ? 'Already have an account? Sign in' : 'Need an account? Register'}
        </button>
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

        <label className="auth-label">Password</label>
        <input
          className="auth-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        {message && (
          <p className={`auth-message ${message.ok ? 'success' : 'error'}`}>
            {message.text}
          </p>
        )}

        <button className="auth-submit-btn" type="submit" disabled={loading}>
          {loading ? 'Please wait…' : mode === 'register' ? 'Create Account' : 'Sign In'}
        </button>

        <button className="auth-back-link" type="button" onClick={() => reset(null)}>
          ← Back
        </button>
      </form>
    </div>
  )
}
