import { useContext } from "react";
import AppendedHeader from "../headers/AppendedHeader";
import AppContext from "../../context/AppContext";
import TeamMember from "./TeamMember";
import "./Team.css"

export default function Team() {
  const { team, setTeam } = useContext(AppContext)
  function saveTeam() {
    localStorage.setItem("team", JSON.stringify(team))
  }
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
        <h2>Team Power Score: {team.reduce((sum, char) => sum + Number(char.ki.replaceAll('.', '')), 0).toLocaleString()}</h2>
        <div id='max'>
          <h3>Max Saiyans: {team.filter(m => m.race === 'Saiyan').length} / 1</h3>
          <h3>Max Team Size: {team.length} / 3</h3>
        </div>
        <div id='options'>
          <button id='save' onClick={saveTeam}>Save Team</button>
          <button id='clear' onClick={clearTeam}>Clear Team</button>
          <button id='fight'>Fight!</button>
        </div>
      </div>
    </>
  )
}