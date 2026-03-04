import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./components/home/HomePage"
import AppContextProvider from "./context/AppContextProvider"
import CharacterDetails from "./components/characters/CharacterDetails"
import Team from "./components/team/Team"

export default function App() {

  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/characters/:name' element={<CharacterDetails />} />
          <Route path='/myteam' element={<Team />} />
        </Routes>
      </Router>
    </AppContextProvider>
  )
}