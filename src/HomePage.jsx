import { useEffect, useState } from "react"
import BrowseCharacter from "./BrowseCharacter"
import HomePageHeader from "./HomePageHeader"

export default function HomePage() {
  const [characters, setCharacters] = useState(null)

  useEffect(() => {
    fetch('https://dragonball-api.com/api/characters?limit=100')
      .then(res => res.json())
      .then(data => setCharacters(data.items))
  }, [])

  if (!characters) return 'Loading...'
  return (
    <>
      <HomePageHeader />
      <h1 id='browseTitle'>Browse Characters</h1>
      <button id='random' disabled='true'>Random Character!</button>
      <div id='browse'>
        {characters.map(c => <BrowseCharacter character={c} />)}
      </div>
    </>
  )
}