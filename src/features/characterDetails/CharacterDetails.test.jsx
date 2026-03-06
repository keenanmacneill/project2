import { screen, fireEvent } from "@testing-library/react"
import CharacterDetails from "./CharacterDetails"
import { renderWithProviders } from "../../test/test-utils"

vi.mock("../../shared/AppendedHeader", () => ({
  default: () => <div>Mock Header</div>,
}))

describe("CharacterDetails", () => {
  const baseCharacter = {
    name: "Goku",
    ki: 9000,
    maxKi: 15000,
    race: "Saiyan",
    gender: "Male",
    description: "A powerful fighter",
    image: "/goku.png",
    affiliation: "Z Fighter",
    level: 20,
  }

  beforeEach(() => {
    Storage.prototype.setItem = vi.fn()
  })

  it("renders character info", () => {
    renderWithProviders(<CharacterDetails />, {
      contextValue: {
        characterDetails: baseCharacter,
        team: [],
      },
    })

    expect(screen.getByText("Goku")).toBeInTheDocument()
    expect(screen.getByText("Biography")).toBeInTheDocument()
    expect(screen.getByText("Stats")).toBeInTheDocument()
    expect(screen.getByText("A powerful fighter")).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "Goku" })).toBeInTheDocument()
    expect(screen.getByText("9,000")).toBeInTheDocument()
    expect(screen.getByText("15,000")).toBeInTheDocument()
  })

  it("shows Add to Team when character can be added", () => {
    renderWithProviders(<CharacterDetails />, {
      contextValue: {
        characterDetails: baseCharacter,
        team: [],
      },
    })

    expect(
      screen.getByRole("button", { name: "Add to Team" })
    ).toBeEnabled()
  })

  it("adds character to team when Add to Team is clicked", () => {
    const setTeam = vi.fn()

    renderWithProviders(<CharacterDetails />, {
      contextValue: {
        characterDetails: baseCharacter,
        team: [],
        setTeam,
      },
    })

    fireEvent.click(screen.getByRole("button", { name: "Add to Team" }))
    expect(setTeam).toHaveBeenCalled()
  })

  it("shows Remove from Team when character is already in team", () => {
    renderWithProviders(<CharacterDetails />, {
      contextValue: {
        characterDetails: baseCharacter,
        team: [baseCharacter],
      },
    })

    expect(
      screen.getByRole("button", { name: "Remove from Team" })
    ).toBeEnabled()
  })

  it("disables button when team is full", () => {
    renderWithProviders(<CharacterDetails />, {
      contextValue: {
        characterDetails: baseCharacter,
        team: [
          { name: "Vegeta", level: 10 },
          { name: "Piccolo", level: 10 },
        ],
      },
    })

    expect(
      screen.getByRole("button", { name: "Team is full" })
    ).toBeDisabled()
  })

  it("disables button when level cap would be exceeded", () => {
    renderWithProviders(<CharacterDetails />, {
      contextValue: {
        characterDetails: { ...baseCharacter, level: 30 },
        team: [{ name: "Vegeta", level: 26 }],
      },
    })

    expect(
      screen.getByRole("button", { name: "Level too high" })
    ).toBeDisabled()
  })

  it("writes team to localStorage when team changes", () => {
    renderWithProviders(<CharacterDetails />, {
      contextValue: {
        characterDetails: baseCharacter,
        team: [baseCharacter],
      },
    })

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "team",
      JSON.stringify([baseCharacter])
    )
  })
})