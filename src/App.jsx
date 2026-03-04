import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./HomePage"
import AppContextProvider from "./AppContextProvider"
import CharacterDetails from "./CharacterDetails"
import Team from "./Team"

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