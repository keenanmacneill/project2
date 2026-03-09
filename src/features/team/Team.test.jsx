import { screen, fireEvent } from "@testing-library/react"
import Team from "./Team"
import { renderWithProviders } from "../../test/renderWithProviders"

describe("Team", () => {

  beforeEach(() => {
    Storage.prototype.setItem = vi.fn()
  })

  it("clears the team", () => {
    const setTeam = vi.fn()

    renderWithProviders(<Team />, {
      contextValue: {
        team: [{ name: "Goku", level: 20 }],
        setTeam
      }
    })

    fireEvent.click(screen.getByText("Clear Team"))

    expect(localStorage.setItem).toHaveBeenCalledWith("team", JSON.stringify([]))
    expect(setTeam).toHaveBeenCalledWith([])
  })

})