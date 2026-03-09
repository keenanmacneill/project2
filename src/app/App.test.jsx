import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "./App"

describe("App integration", () => {
  const mockCharacters = [
    {
      id: 1,
      name: "Goku",
      image: "goku.png",
      race: "Saiyan",
      gender: "Male",
      description: "A legendary fighter.",
      affiliation: "Z Fighter",
      ki: "9,000",
      maxKi: "15,000",
    },
    {
      id: 2,
      name: "Vegeta",
      image: "vegeta.png",
      race: "Saiyan",
      gender: "Male",
      description: "Prince of all Saiyans.",
      affiliation: "Z Fighter",
      ki: "8,500",
      maxKi: "14,500",
    },
  ]

  beforeEach(() => {
    localStorage.clear()
    vi.spyOn(global, "fetch").mockResolvedValue({
      json: vi.fn().mockResolvedValue({ items: mockCharacters }),
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("loads characters, navigates to random character details, and adds to the team", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0)
    const user = userEvent.setup()

    render(<App />)

    expect(await screen.findByText("Browse Characters")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Random Character!" }))

    expect(await screen.findByRole("heading", { name: "Goku" })).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Add to Team" }))
    await user.click(screen.getByRole("button", { name: "My Team" }))

    expect(await screen.findByRole("heading", { name: "My Team" })).toBeInTheDocument()
    expect(screen.getByText(/Team Level 4 \/ 55/)).toBeInTheDocument()

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem("team"))).toHaveLength(1)
    })
  })
})