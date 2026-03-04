import { useContext } from "react";
import AppendedHeader from "./AppendedHeader";
import AppContext from "./AppContext";
import TeamMember from "./TeamMember";

export default function Team() {
  const { team } = useContext(AppContext)
  function saveTeam() {
    localStorage.setItem("team", JSON.stringify(team))
  }

  return (
    <>
      <AppendedHeader />
      <div id='teamContainer'>
        <h1>My Team</h1>
        <div id='teamGallery'>
          {team.map(t => <TeamMember character={t} />)}
        </div>
        <h2>Team Power Score: {team.reduce((sum, char) => sum + Number(char.ki.replaceAll('.', '')), 0).toLocaleString()}</h2>
        <div id='max'>
          <h3>Max Saiyans: {team.filter(m => m.race === 'Saiyan').length} / 2</h3>
          <h3>Max Team Size: {team.length} / 6</h3>
        </div>
        <button id='save' onClick={saveTeam}>Save Team</button>
      </div>
    </>
  )
}