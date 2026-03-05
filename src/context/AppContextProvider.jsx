import AppContext from "./AppContext";
import { useState, useEffect } from "react";

export default function AppContextProvider({ children }) {
  const [characterDetails, setCharacterDetails] = useState(null)
  const [team, setTeam] = useState([])

  const [searchValue, setSearchValue] = useState("")
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("asc")

  const contextValue = {
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

  useEffect(() => {
    const savedTeam = localStorage.getItem("team")
    if (!savedTeam) return
    setTeam(JSON.parse(savedTeam))
  }, [])

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}