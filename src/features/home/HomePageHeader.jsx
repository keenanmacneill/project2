import { useNavigate } from 'react-router-dom'
import '../../shared/headers.css'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'

export default function HomePageHeader() {
  const navigate = useNavigate()
  const { searchValue, setSearchValue, setSearch, sort, setSort } = useContext(AppContext)
  const updateSearchValue = e => {
    const val = e.target.value
    setSearchValue(val)
    if (val === '') setSearch('')
  }

  return (
    <div id='homePageHeader'>
      <p id='headerTitle'>PATH TO POWER</p>
      <input id='searchBar' type="search" placeholder="Search Characters..." value={searchValue} onChange={updateSearchValue} onKeyDown={(e) => e.key === "Enter" && setSearch(searchValue)} />
      <div id='filterContainer'>
        <button id='search' onClick={() => setSearch(searchValue)}>Search</button>
        <div id='selectWrap'>
          <select id='sort' value={sort} onChange={e => setSort(e.target.value)}>
            <option value='asc'>A-Z</option>
            <option value='desc'>Z-A</option>
            <option value='descKi'>Highest Ki</option>
            <option value='ascKi'>Lowest Ki</option>
            <option value='descLevel'>Highest Level</option>
            <option value='ascLevel'>Lowest Level</option>
            <option value='descMaxKi'>Highest Max Ki</option>
            <option value='ascMaxKi'>Lowest Max Ki</option>
          </select>
        </div>
        <button id='team' onClick={() => navigate('/myteam')}>My Team</button>
      </div>
    </div >
  )
}