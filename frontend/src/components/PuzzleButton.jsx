import { useState, useEffect } from 'react'
import '../styles/PuzzleButton.css'

export default function PuzzleButton({ children }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button className="puzzle-btn" onClick={() => setOpen(true)}>
        Solve To Proceed
      </button>
      {open && (
        <div className="puzzle-modal-overlay" onClick={() => setOpen(false)}>
          <div
            className="puzzle-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="puzzle-modal-close"
              aria-label="Close puzzle"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <div className="puzzle-modal-content">{children}</div>
          </div>
        </div>
      )}
    </>
  )
}
