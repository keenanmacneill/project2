import AppContext from "./AppContext";
import { useState, useEffect } from "react";

export default function AppContextProvider({ children }) {
  const [characters, setCharacters] = useState(null)
  const [searchValue, setSearchValue] = useState("")
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("asc")

  const [characterDetails, setCharacterDetails] = useState(() => {
    const saved = localStorage.getItem("details");
    return saved ? JSON.parse(saved) : null;
  });

  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem("team");
    return saved ? JSON.parse(saved) : [];
  })

  const parsePower = raw => {
    if (!raw) return 0;

    //'37.5 Septillion' > '37.5 septillion'
    const s = String(raw).trim().toLowerCase();
    if (s === "unknown") return 0;

    const cleaned = s.replaceAll(",", "").replaceAll(".", "").replaceAll(" ", "")
    //'37.000.000' > 37.000.000, no word
    if (cleaned && !isNaN(cleaned)) {
      return Number(cleaned);
    }

    //['37.5', '', 'septillion'] > ['37.5', '', 'septillion']
    const parts = s.split(" ").filter(Boolean);
    //no word
    if (parts.length !== 2) return 0;

    const num = Number(parts[0]);
    let unit = parts[1];
    if (unit.endsWith("s")) {
      unit = unit.slice(0, -1);
    }
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
    if (pow[unit] === undefined) return 0;

    //bracket notation to retrieve unit value
    return num * 10 ** pow[unit];
  };

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

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}