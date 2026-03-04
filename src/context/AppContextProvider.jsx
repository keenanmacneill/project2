import AppContext from "./AppContext";
import { useState, useEffect } from "react";

export default function AppContextProvider({ children }) {
  const [characterDetails, setCharacterDetails] = useState(null)
  const [team, setTeam] = useState([])
  const contextValue = {
    characterDetails,
    setCharacterDetails,
    team,
    setTeam
  }

  useEffect(() => {
    const savedTeam = localStorage.getItem("team")
    setTeam(JSON.parse(savedTeam))
  }, [setTeam])

  return (
    < AppContext.Provider value={contextValue}>
      {children}
    </ AppContext.Provider>
  )
}