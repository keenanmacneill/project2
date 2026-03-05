import AppContext from "./AppContext";
import { useState, useEffect } from "react";

export default function AppContextProvider({ children }) {
  const [characters, setCharacters] = useState(null)
  const [characterDetails, setCharacterDetails] = useState(() => {
    const saved = localStorage.getItem("details");
    return saved ? JSON.parse(saved) : null;
  });
  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem("team");
    return saved ? JSON.parse(saved) : [];
  })

  const [searchValue, setSearchValue] = useState("")
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("asc")

  const contextValue = {
    characters,
    setCharacters,
    characterDetails,
    setCharacterDetails,
    team,
    setTeam,
    searchValue,
    setSearchValue,
    search,
    setSearch,
    sort,
    setSort
  }

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
      googolplex: 40
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
          level: Math.round(Math.log10(Math.max(parsePower(c.maxKi), 1)))
        }));
        setCharacters(sortedArr)
      })
  }, [])

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}