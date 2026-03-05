import { useContext, useEffect, useState } from "react"
import BrowseCharacter from "../components/BrowseCharacter"
import HomePageHeader from "../components/HomePageHeader"
import "./HomePage.css"
import AppContext from "../../../context/AppContext"

export default function HomePage() {
  const [characters, setCharacters] = useState(null)
  const { search, sort } = useContext(AppContext)
  const parsePower = raw => {
    if (!raw) return 0;
    const s = String(raw).trim().toLowerCase();

    if (s === "unknown") return 0;
    if (/^[\d.,\s]+$/.test(s)) return Number(s.replace(/[^\d]/g, "")) || 0;

    const m = s.match(/^([\d.]+)\s*([a-z]+)$/);

    if (!m) return 0;

    const num = Number(m[1]);
    const unit = m[2].replace(/s$/, "");
    const pow = {
      billion: 9,
      trillion: 12,
      quadrillion: 15,
      quintillion: 18,
      sextillion: 21,
      septillion: 24,
      septllion: 24,
      googolplex: 30
    };

    if (!pow[unit]) return 0;

    return num * 10 ** pow[unit];
  }

  useEffect(() => {
    fetch('https://dragonball-api.com/api/characters?limit=100')
      .then(res => res.json())
      .then(data => {
        const sortedArr = data.items.map(c => ({
          ...c,
          ki: parsePower(c.ki),
          maxKi: parsePower(c.maxKi),
        }));
        setCharacters(sortedArr)
      })
  }, [])

  if (!characters) return 'Loading...'
  const shownCharacters = [...characters]
    .filter(c => !search ? true : c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "asc") return a.name.localeCompare(b.name)
      if (sort === "desc") return b.name.localeCompare(a.name)

      if (sort === "ascKi") return a.ki - b.ki
      if (sort === "descKi") return b.ki - a.ki

      if (sort === "ascMaxKi") return a.maxKi - b.maxKi
      if (sort === "descMaxKi") return b.maxKi - a.maxKi

      return 0
    })
  return (
    <>
      <HomePageHeader />
      <h1 id='browseTitle'>Browse Characters</h1>
      <button id='random' disabled={true}>Random Character!</button>
      <div id='browse'>
        {shownCharacters.map(c => <BrowseCharacter key={c.id} character={c} />)}
      </div>
    </>
  )
}