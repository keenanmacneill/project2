import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import AppContext from "../context/AppContext"

export function renderWithProviders(ui, { route = "/", contextValue = {}, } = {}) {
  const defaultContext = {
    characterDetails: null,
    setCharacterDetails: vi.fn(),
    team: [],
    setTeam: vi.fn(),
    search: "",
    sort: "asc",
    characters: [],
  }

  return render(
    <MemoryRouter initialEntries={[route]}>
      <AppContext.Provider value={{ ...defaultContext, ...contextValue }}>
        {ui}
      </AppContext.Provider>
    </MemoryRouter>
  )
}