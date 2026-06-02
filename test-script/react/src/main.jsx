import React from 'react'
import ReactDOM from 'react-dom/client'
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk'
import FlagEvaluator from './FlagEvaluator'

;(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: import.meta.env.VITE_LD_CLIENT_ID,
    context: {
      kind: 'user',
      key: 'test-user',
      name: 'Test User',
    },
  })

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <LDProvider>
        <FlagEvaluator />
      </LDProvider>
    </React.StrictMode>
  )
})()
