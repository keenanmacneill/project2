import { useNavigate } from 'react-router-dom'
import './headers.css'

export default function AppendedHeader() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <div id='appendedHeader'>
      <p id='headerTitle' onClick={handleClick}>PATH TO POWER</p>
      <button id='home' onClick={handleClick}>Home</button>
      <button id='team' onClick={() => navigate('/myteam')}>My Team</button>
    </div>
  )
}