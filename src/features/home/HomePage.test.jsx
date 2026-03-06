import { screen, fireEvent } from "@testing-library/react"
import HomePage from "./HomePage"
import { renderWithProviders } from "../../test/test-utils"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock(".//HomePageHeader", () => ({
  default: () => <div>Mock Home Header</div>,
}))

vi.mock("../browse/BrowseCharacter", () => ({
  default: ({ character }) => <div>{character.name}</div>,
}))

describe("HomePage", () => {
  const characters = [
    { id: 1, name: "Goku", ki: 9000, maxKi: 15000, level: 20 },
    { id: 2, name: "Vegeta", ki: 8000, maxKi: 14000, level: 18 },
    { id: 3, name: "Piccolo", ki: 5000, maxKi: 10000, level: 12 },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    Storage.prototype.setItem = vi.fn()
  })

  it("shows loading when characters is null", () => {
    renderWithProviders(<HomePage />, {
      contextValue: {
        characters: null,
      },
    })

    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  it("renders all characters", () => {
    renderWithProviders(<HomePage />, {
      contextValue: {
        characters,
        search: "",
        sort: "asc",
      },
    })

    expect(screen.getByText("Goku")).toBeInTheDocument()
    expect(screen.getByText("Vegeta")).toBeInTheDocument()
    expect(screen.getByText("Piccolo")).toBeInTheDocument()
  })

  it("filters characters by search", () => {
    renderWithProviders(<HomePage />, {
      contextValue: {
        characters,
        search: "go",
        sort: "asc",
      },
    })

    expect(screen.getByText("Goku")).toBeInTheDocument()
    expect(screen.queryByText("Vegeta")).not.toBeInTheDocument()
    expect(screen.queryByText("Piccolo")).not.toBeInTheDocument()
  })

  it("sorts characters by descending level", () => {
    renderWithProviders(<HomePage />, {
      contextValue: {
        characters,
        search: "",
        sort: "descLevel",
      },
    })

    const names = screen.getAllByText(/Goku|Vegeta|Piccolo/).map(el => el.textContent)
    expect(names).toEqual(["Goku", "Vegeta", "Piccolo"])
  })

  it("stores details and navigates on random click", () => {
    const setCharacterDetails = vi.fn()

    vi.spyOn(Math, "random").mockReturnValue(0)

    renderWithProviders(<HomePage />, {
      contextValue: {
        characters,
        search: "",
        sort: "asc",
        setCharacterDetails,
      },
    })

    fireEvent.click(screen.getByRole("button", { name: "Random Character!" }))

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "details",
      JSON.stringify(characters[0])
    )
    expect(setCharacterDetails).toHaveBeenCalledWith(characters[0])
    expect(mockNavigate).toHaveBeenCalledWith("/character/Goku")

    Math.random.mockRestore()
  })
})