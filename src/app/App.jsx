import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "../features/home/page/HomePage"
import AppContextProvider from "../context/AppContextProvider"
import CharacterDetails from "../features/characterDetails/CharacterDetails"
import Team from "../features/team/page/Team"

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