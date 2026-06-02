import { useState } from 'react'
import { useLDClient } from 'launchdarkly-react-client-sdk'

export default function FlagEvaluator() {
  const ldClient = useLDClient()
  const [flagKey, setFlagKey] = useState('')
  const [defaultValue, setDefaultValue] = useState('false')
  const [result, setResult] = useState(null)

  const evaluate = () => {
    if (!flagKey.trim()) return

    // Parse defaultValue to correct type
    let parsedDefault
    try {
      parsedDefault = JSON.parse(defaultValue)
    } catch {
      parsedDefault = defaultValue
    }

    const value = ldClient.variation(flagKey.trim(), parsedDefault)
    setResult({ key: flagKey.trim(), value, type: typeof value })
    ldClient.flush();
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>LaunchDarkly Flag Evaluator</h1>
        <p style={styles.subtitle}>
          Connected to project:{' '}
          <code style={styles.code}>{import.meta.env.VITE_LD_CLIENT_ID}</code>
        </p>

        <div style={styles.field}>
          <label style={styles.label}>Flag Key</label>
          <input
            style={styles.input}
            type="text"
            placeholder="e.g. switch-castle-dungeon"
            value={flagKey}
            onChange={(e) => setFlagKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && evaluate()}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Default Value (used if flag not found)</label>
          <input
            style={styles.input}
            type="text"
            placeholder='e.g. false, true, "my-string", 0'
            value={defaultValue}
            onChange={(e) => setDefaultValue(e.target.value)}
          />
        </div>

        <button style={styles.btn} onClick={evaluate}>
          Evaluate Flag
        </button>

        {result && (
          <div style={{
            ...styles.result,
            borderColor: result.value === true ? '#4ade80'
                       : result.value === false ? '#f87171'
                       : '#7c3aed',
          }}>
            <p style={styles.resultRow}>
              <span style={styles.resultLabel}>Flag Key</span>
              <code style={styles.code}>{result.key}</code>
            </p>
            <p style={styles.resultRow}>
              <span style={styles.resultLabel}>Value</span>
              <code style={{
                ...styles.code,
                color: result.value === true ? '#4ade80'
                     : result.value === false ? '#f87171'
                     : '#a78bfa',
              }}>
                {JSON.stringify(result.value)}
              </code>
            </p>
            <p style={styles.resultRow}>
              <span style={styles.resultLabel}>Type</span>
              <code style={styles.code}>{result.type}</code>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a3e 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '2rem',
  },
  card: {
    background: '#1e1e2e',
    borderRadius: '16px',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '480px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    border: '1px solid #2d2d4e',
    color: '#e2e8f0',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    background: 'linear-gradient(90deg, #7c3aed, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.4rem',
  },
  subtitle: {
    fontSize: '0.8rem',
    color: '#64748b',
    marginBottom: '1.75rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    marginBottom: '1rem',
  },
  label: {
    fontSize: '0.85rem',
    color: '#94a3b8',
    fontWeight: '500',
  },
  input: {
    padding: '0.65rem 0.85rem',
    borderRadius: '8px',
    border: '1px solid #2d2d4e',
    background: '#0f0f1a',
    color: '#e2e8f0',
    fontSize: '0.95rem',
    outline: 'none',
  },
  btn: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(90deg, #7c3aed, #3b82f6)',
    color: '#fff',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '1.5rem',
  },
  result: {
    borderRadius: '10px',
    border: '1px solid',
    padding: '1rem 1.25rem',
    background: '#0f0f1a',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  resultRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0,
  },
  resultLabel: {
    fontSize: '0.85rem',
    color: '#64748b',
  },
  code: {
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    color: '#a78bfa',
  },
}
