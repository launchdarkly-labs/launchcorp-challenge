import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk'
import App from './App'
import ClientIdLogin from './components/ClientIdLogin'
import './index.css'

function Root() {
  const [LDProvider, setLDProvider] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleClientId = async (clientSideID) => {
    setLoading(true)
    setError(null)
    try {
      const Provider = await asyncWithLDProvider({
        clientSideID,
        context: { kind: 'user', key: 'newuser' },
      })
      setLDProvider(() => Provider)
    } catch {
      setError('Could not initialise LaunchDarkly. Check your client-side ID.')
      setLoading(false)
    }
  }

  if (!LDProvider) {
    return (
      <ClientIdLogin
        onSubmit={handleClientId}
        loading={loading}
        error={error}
      />
    )
  }

  return (
    <LDProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LDProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
