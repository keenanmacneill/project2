import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "../features/home/HomePage"
import AppContextProvider from "../context/AppContextProvider"
import CharacterDetails from "../features/characterDetails/CharacterDetails"
import Team from "../features/team/Team"
import Fight from "../features/fight/Fight"

export default function App() {

  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/character/:name' element={<CharacterDetails />} />
          <Route path='/myteam' element={<Team />} />
          <Route path='/fight' element={<Fight />} />
        </Routes>
      </Router>
    </AppContextProvider>
  )
}