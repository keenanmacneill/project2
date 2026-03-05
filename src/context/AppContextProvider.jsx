import AppContext from "./AppContext";
import { useState } from "react";

export default function AppContextProvider({ children }) {
  const [characterDetails, setCharacterDetails] = useState(() => {
    const saved = localStorage.getItem("details");
    return saved ? JSON.parse(saved) : null;
  });
  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem("team");
    return saved ? JSON.parse(saved) : null;
  })

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

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}