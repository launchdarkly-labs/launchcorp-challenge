import { useNavigate } from 'react-router-dom'
import '../styles/BackButton.css'

export default function BackButton() {
  const navigate = useNavigate()
  return (
    <button className="go-back-btn" onClick={() => navigate(-1)}>
      ← Go Back
    </button>
  )
}
