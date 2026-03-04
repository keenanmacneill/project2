import { useNavigate } from 'react-router-dom'

export default function HomePageHeader() {
  const navigate = useNavigate()

  return (
    <div id='homePageHeader'>
      <p id='headerTitle'>POWER SCOUT</p>
      <input id='search' type="search" placeholder="Search Characters..." />
      <div id='filterContainer'>
        <button id='filter'>Filter</button>
        <button id='sort'>Sort</button>
        <button id='team' onClick={() => navigate('/myteam')}>My Team</button>
      </div>
    </div>
  )
}