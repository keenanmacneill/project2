import AppContext from "./AppContext";
import { useState } from "react";

export default function AppContextProvider({ children }) {
  const [characterDetails, setCharacterDetails] = useState(null)
  const [team, setTeam] = useState([])
  const contextValue = {
    characterDetails,
    setCharacterDetails,
    team,
    setTeam
  }

  return (
    < AppContext.Provider value={contextValue}>
      {children}
    </ AppContext.Provider>
  )
}