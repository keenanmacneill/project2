import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "../features/home/HomePage"
import AppContextProvider from "../context/AppContextProvider"
import CharacterDetails from "../features/characterDetails/CharacterDetails"
import Team from "../features/team/Team"
import Rounds from "../features/rounds/Rounds"

export default function App() {

  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/character/:name' element={<CharacterDetails />} />
          <Route path='/myteam' element={<Team />} />
          <Route path='/fight' element={<Rounds />} />
        </Routes>
      </Router>
    </AppContextProvider>
  )
}