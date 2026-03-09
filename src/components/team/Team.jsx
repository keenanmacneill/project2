import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppendedHeader from "../shared/AppendedHeader";
import AppContext from "../../context/AppContext";
import TeamMember from "./TeamMember";
import "./Team.css"

export default function Team() {
  const { team, setTeam } = useContext(AppContext)
  const navigate = useNavigate()

  const clearTeam = () => {
    localStorage.setItem("team", JSON.stringify([]))
    setTeam([])
  }

  const fight = () => {
    navigate('/fight')
  }

  return (
    <>
      <AppendedHeader />
      <div id='teamContainer'>
        <h1>My Team</h1>
        <div id='teamGallery'>
          {[0, 1].map(i => {
            const member = team[i]
            return member
              ? <TeamMember key={member.name} character={member} />
              : (<div key={i} className="teamEmptySlot"><p>Empty Slot</p></div>)
          })}
        </div>
        <h3 id='max'>Team Level {team.map(c => c.level).reduce((sum, accum) => sum + accum, 0)} / 55</h3>
        <div id='options'>
          <button id='clear' onClick={clearTeam}>Clear Team</button>
          <button id='fight' onClick={fight} disabled={team.length === 0}>Fight!</button>
        </div>
      </div>
    </>
  )
}