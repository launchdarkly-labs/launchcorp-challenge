import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk'
import App from './App'
import './index.css'

const clientSideID = import.meta.env.VITE_LD_CLIENT_ID;

(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID,
    context: {
      kind: 'user',
      key: 'newuser',
    }
  })

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <LDProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LDProvider>
    </React.StrictMode>
  )
})()
