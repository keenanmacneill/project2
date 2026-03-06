import { useContext } from "react"
import { useNavigate } from 'react-router-dom'
import BrowseCharacter from "../browse/BrowseCharacter"
import HomePageHeader from ".//HomePageHeader"
import "./HomePage.css"
import AppContext from "../../context/AppContext"

export default function HomePage() {
  const { search, sort, setCharacterDetails, characters } = useContext(AppContext)
  const navigate = useNavigate()

  if (!characters) return 'Loading...'

  const shownCharacters = [...characters]
    .filter(c => !search ? true : c.name.toLowerCase().includes(search.trim().toLowerCase()))
    .sort((a, b) => {
      if (sort === "asc") return a.name.localeCompare(b.name)
      if (sort === "desc") return b.name.localeCompare(a.name)
      if (sort === "ascKi") return a.ki - b.ki
      if (sort === "descKi") return b.ki - a.ki
      if (sort === "ascLevel") return a.level - b.level
      if (sort === "descLevel") return b.level - a.level
      if (sort === "ascMaxKi") return a.maxKi - b.maxKi
      if (sort === "descMaxKi") return b.maxKi - a.maxKi
      return 0
    })

  const handleRandom = () => {
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)]
    const { name } = randomCharacter
    localStorage.setItem("details", JSON.stringify(randomCharacter))
    setCharacterDetails(randomCharacter)
    navigate(`/character/${name}`)
  }

  return (
    <>
      <HomePageHeader />
      <h1 id='browseTitle'>Browse Characters</h1>
      <button id='random' onClick={handleRandom}>Random Character!</button>
      <div id='browse'>
        {shownCharacters.map(c => <BrowseCharacter key={c.id} character={c} />)}
      </div>
    </>
  )
}