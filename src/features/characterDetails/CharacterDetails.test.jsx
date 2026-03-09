import { screen, fireEvent } from "@testing-library/react"
import CharacterDetails from "./CharacterDetails"
import { renderWithProviders } from "../../test/testUtils"

const character = {
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

describe("CharacterDetails", () => {

  it("adds character to team", () => {
    const setTeam = vi.fn()

    renderWithProviders(<CharacterDetails />, {
      contextValue: {
        characterDetails: character,
        team: [],
        setTeam
      }
    })

    fireEvent.click(screen.getByText("Add to Team"))

    expect(setTeam).toHaveBeenCalled()
  })

  it("disables button when team is full", () => {
    renderWithProviders(<CharacterDetails />, {
      contextValue: {
        characterDetails: character,
        team: [
          { name: "Vegeta", level: 10 },
          { name: "Piccolo", level: 10 }
        ]
      }
    })

    expect(screen.getByText("Team is full")).toBeDisabled()
  })

})