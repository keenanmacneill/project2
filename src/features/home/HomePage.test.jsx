import { screen, fireEvent } from "@testing-library/react"
import HomePage from "./HomePage"
import { renderWithProviders } from "../../test/testUtils"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe("HomePage", () => {
  it("navigates to a random character", () => {
    const setCharacterDetails = vi.fn()

    const characters = [
      { id: 1, name: "Goku", ki: 9000, maxKi: 15000, level: 20 },
      { id: 2, name: "Vegeta", ki: 8000, maxKi: 14000, level: 18 },
    ]

    vi.spyOn(Math, "random").mockReturnValue(0)

    renderWithProviders(<HomePage />, {
      contextValue: {
        characters,
        setCharacterDetails,
      },
    })

    fireEvent.click(screen.getByText("Random Character!"))

    expect(setCharacterDetails).toHaveBeenCalledWith(characters[0])
    expect(mockNavigate).toHaveBeenCalledWith("/character/Goku")
  })
})