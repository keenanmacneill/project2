import { screen, fireEvent } from "@testing-library/react"
import HomePage from "../features/home/HomePage"
import { renderWithProviders } from "../test/testUtils"

describe("HomePage Random Button", () => {

  beforeEach(() => {
    vi.spyOn(Storage.prototype, "setItem")
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("selects a random character and saves it", () => {

    const setCharacterDetails = vi.fn()

    const characters = [
      { id: 1, name: "Goku", ki: 9000, maxKi: 15000, level: 20 },
      { id: 2, name: "Vegeta", ki: 8000, maxKi: 14000, level: 18 }
    ]

    vi.spyOn(Math, "random").mockReturnValue(0)

    renderWithProviders(<HomePage />, {
      contextValue: {
        characters,
        setCharacterDetails,
        search: "",
        sort: "asc"
      }
    })

    fireEvent.click(screen.getByText("Random Character!"))

    expect(setCharacterDetails).toHaveBeenCalledWith(characters[0])

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "details",
      JSON.stringify(characters[0])
    )
  })
})