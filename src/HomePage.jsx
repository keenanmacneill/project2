import { useContext, useEffect, useState } from "react"
import BrowseCharacter from "./BrowseCharacter"
import HomePageHeader from "./HomePageHeader"
import { useNavigate } from "react-router-dom"
import AppContext from "./AppContext"

export default function HomePage() {
  const [characters, setCharacters] = useState(null)
  // const navigate = useNavigate()
  // const { setCharacterDetails } = useContext(AppContext)
  // const handleRandom = () => {
  //   const id = Math.floor(Math.random() * 10 + 77)
  //   for (let char of characters) {
  //     char.id === id ? setCharacterDetails(char) : null
  //   }
  //   navigate(`/characters/${id}`)
  // }

  useEffect(() => {
    fetch('https://dragonball-api.com/api/characters?limit=100')
      .then(res => res.json())
      .then(data => setCharacters(data.items))
  })

  if (!characters) return 'Loading...'
  return (
    <>
      <HomePageHeader />
      <h1 id='browseTitle'>Browse Characters</h1>
      <button id='random'>Random Character!</button>
      <div id='browse'>
        {characters.map(c => <BrowseCharacter character={c} />)}
      </div>
    </>
  )
}