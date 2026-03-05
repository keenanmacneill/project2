import { useContext } from "react";
import AppendedHeader from "../../shared/AppendedHeader";
import AppContext from "../../context/AppContext";
import TeamMember from "./TeamMember";
import "./Team.css"

export default function Team() {
  const { team, setTeam } = useContext(AppContext)
  function clearTeam() {
    localStorage.setItem("team", JSON.stringify([]))
    setTeam([])
  }

  return (
    <>
      <AppendedHeader />
      <div id='teamContainer'>
        <h1>My Team</h1>
        <div id='teamGallery'>
          {[...Array(3)].map((_, i) => {
            const member = team[i]
            return member
              ? <TeamMember key={member.name} character={member} />
              : (
                <div key={i} className="teamEmptySlot">
                  <p>Empty Slot</p>
                </div>
              )
          })}
        </div>
        <h2>Team Power Score: {team.reduce((sum, char) => sum + char.ki, 0).toLocaleString()}</h2>
        <div id='options'>
          <button id='clear' onClick={clearTeam}>Clear Team</button>
          <button id='fight' disabled={true}>Fight!</button>
        </div>
      </div>
    </>
  )
}