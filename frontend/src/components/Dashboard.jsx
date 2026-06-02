import { useNavigate } from 'react-router-dom'
import '../styles/Dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="dashboard-page">
      <button className="dashboard-click-btn" onClick={() => navigate('/castle')}>
        Click Me
      </button>
    </div>
  )
}
