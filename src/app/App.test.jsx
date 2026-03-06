import { screen, fireEvent } from "@testing-library/react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import AppContext from "../context/AppContext"
import HomePage from "../features/home/HomePage"
import CharacterDetails from "../features/characterDetails/CharacterDetails"
import Team from "../features/team/Team"
import { renderWithProviders } from "../test/test-utils"

vi.mock("./components/home/HomePageHeader", () => ({
  default: () => <div>Mock Home Header</div>,
}))

vi.mock("./shared/AppendedHeader", () => ({
  default: () => <div>Mock Header</div>,
}))

vi.mock("./components/browse/BrowseCharacter", () => ({
  default: ({ character }) => <div>{character.name}</div>,
}))

vi.mock("./components/team/TeamMember", () => ({
  default: ({ character }) => <div>{character.name}</div>,
}))

function TestApp() {
  const [team, setTeam] = useState([])
  const [characterDetails, setCharacterDetails] = useState({
    name: "Goku",
    ki: 9000,
    maxKi: 15000,
    race: "Saiyan",
    gender: "Male",
    description: "A powerful fighter",
    image: "/goku.png",
    affiliation: "Z Fighter",
    level: 20,
  })

  const characters = [characterDetails]

  return (
    <AppContext.Provider
      value={{
        team,
        setTeam,
        characterDetails,
        setCharacterDetails,
        characters,
        search: "",
        sort: "asc",
      }}
    >
      <MemoryRouter initialEntries={["/character/Goku"]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character/:name" element={<CharacterDetails />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </MemoryRouter>
    </AppContext.Provider>
  )
}

describe("App UI flow", () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "setItem")
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("lets a user press the Random Character button and navigate to that character", () => {
    const setCharacterDetails = vi.fn()

    const characters = [
      { id: 1, name: "Goku", ki: 9000, maxKi: 15000, level: 20 },
      { id: 2, name: "Vegeta", ki: 8000, maxKi: 14000, level: 18 }
    ]

    vi.spyOn(Math, "random").mockReturnValue(0)

    renderWithProviders(<HomePage />, {
      contextValue: {
        characters,
        search: "",
        sort: "asc",
        setCharacterDetails
      }
    })

    const randomButton = screen.getByRole("button", { name: "Random Character!" })
    fireEvent.click(randomButton)

    expect(setCharacterDetails).toHaveBeenCalledWith(characters[0])

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "details",
      JSON.stringify(characters[0])
    )
  })
})