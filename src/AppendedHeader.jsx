import { useNavigate } from 'react-router-dom'

export default function AppendedHeader() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }

  return (
    <div id='appendedHeader'>
      <p id='headerTitle' onClick={handleClick}>POWER SCOUT</p>
      <button id='home' onClick={handleClick}>Home</button>
      <button id='sort' onClick={() => navigate('/myteam')}>My Team</button>
    </div>
  )
}