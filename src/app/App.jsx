import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "../components/home/HomePage"
import AppContextProvider from "../context/AppContextProvider"
import CharacterDetails from "../components/characterDetails/CharacterDetails"
import Team from "../components/team/Team"
import Rounds from "../components/rounds/Rounds"

export default function App() {

  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/character/:name' element={<CharacterDetails />} />
          <Route path='/myteam' element={<Team />} />
          <Route path='/fight' element={<Rounds />} />
          <Route path='*' element={<h1>404 - Not Found</h1>} />
        </Routes>
      </Router>
    </AppContextProvider>
  )
}