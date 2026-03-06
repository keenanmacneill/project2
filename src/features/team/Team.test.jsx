import { screen, fireEvent } from "@testing-library/react"
import Team from "./Team"
import { renderWithProviders } from "../../test/testUtils"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock("../../shared/AppendedHeader", () => ({
  default: () => <div>Mock Header</div>,
}))

vi.mock("./TeamMember", () => ({
  default: ({ character }) => <div>{character.name}</div>,
}))

describe("Team", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Storage.prototype.setItem = vi.fn()
  })

  it("renders two empty slots when team is empty", () => {
    renderWithProviders(<Team />, {
      contextValue: {
        team: [],
      },
    })

    expect(screen.getAllByText("Empty Slot")).toHaveLength(2)
    expect(screen.getByText("Team Level 0 / 55")).toBeInTheDocument()
  })

  it("renders team members and total team level", () => {
    renderWithProviders(<Team />, {
      contextValue: {
        team: [
          { name: "Goku", level: 20 },
          { name: "Vegeta", level: 25 },
        ],
      },
    })

    expect(screen.getByText("Goku")).toBeInTheDocument()
    expect(screen.getByText("Vegeta")).toBeInTheDocument()
    expect(screen.getByText("Team Level 45 / 55")).toBeInTheDocument()
  })

  it("clears the team when Clear Team is clicked", () => {
    const setTeam = vi.fn()

    renderWithProviders(<Team />, {
      contextValue: {
        team: [{ name: "Goku", level: 20 }],
        setTeam,
      },
    })

    fireEvent.click(screen.getByRole("button", { name: "Clear Team" }))

    expect(localStorage.setItem).toHaveBeenCalledWith("team", JSON.stringify([]))
    expect(setTeam).toHaveBeenCalledWith([])
  })

  it("disables Fight button when team is empty", () => {
    renderWithProviders(<Team />, {
      contextValue: {
        team: [],
      },
    })

    expect(screen.getByRole("button", { name: "Fight!" })).toBeDisabled()
  })

  it("navigates to fight page when Fight is clicked", () => {
    renderWithProviders(<Team />, {
      contextValue: {
        team: [{ name: "Goku", level: 20 }],
      },
    })

    fireEvent.click(screen.getByRole("button", { name: "Fight!" }))
    expect(mockNavigate).toHaveBeenCalledWith("/fight")
  })
})