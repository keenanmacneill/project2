import { useContext } from "react";
import AppendedHeader from "./AppendedHeader";
import AppContext from "./AppContext";
import TeamMember from "./TeamMember";

export default function Team() {
  const { team } = useContext(AppContext)
  return (
    <>
      <AppendedHeader />
      <div id='teamContainer'>
        <h1>My Team</h1>
        <div id='team'>
          {team.map(t => <TeamMember character={t} />)}
        </div>
        <h2>Team Power Score: {team.reduce((sum, char) => sum + Number(char.ki.replaceAll('.', '')), 0).toLocaleString()}</h2>
        <h3>Max Saiyans: {team.filter(m => m.race === 'Saiyan').length} / 2</h3>
        <h3>Max Team Size: {team.length} / 6</h3>
      </div>
    </>
  )
}