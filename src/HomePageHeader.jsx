import { useNavigate } from 'react-router-dom'

export default function HomePageHeader() {
  const navigate = useNavigate()

  return (
    <div id='homePageHeader'>
      <p id='headerTitle'>PATH TO POWER</p>
      <input id='search' type="search" placeholder="Search Characters..." />
      <div id='filterContainer'>
        <button id='filter' disabled='true'>Filter</button>
        <button id='sort' disabled='true'>Sort</button>
        <button id='team' onClick={() => navigate('/myteam')}>My Team</button>
      </div>
    </div>
  )
}