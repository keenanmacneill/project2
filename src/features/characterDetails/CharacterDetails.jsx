import { useContext, useEffect } from "react"
import AppContext from "../../context/AppContext"
import AppendedHeader from "../../shared/AppendedHeader";
import "./CharacterDetails.css"

export default function CharacterDetails() {
  const { characterDetails } = useContext(AppContext)
  const { name, ki, maxKi, race, gender, description, image, affiliation, level } = characterDetails
  const { setTeam, team } = useContext(AppContext)

  const inTeam = team.some(char => char.name === name)
  const teamFull = team.length >= 2
  const canAdd = characterDetails.level + team.map(c => c.level).reduce((sum, accum) => sum + accum, 0) <= 55

  const handleClick = () => {
    inTeam
      ? setTeam(prev => prev.filter(c => c.name !== name))
      : setTeam(prev => [...prev, characterDetails])
  }

  useEffect(() => {
    localStorage.setItem("team", JSON.stringify(team))
  }, [team])

  const checkTeam =
    inTeam
      ? 'Remove from Team'
      : teamFull
        ? 'Team is full'
        : !canAdd
          ? 'Level too high'
          : 'Add to Team'

  const checkDisabled = !inTeam && (teamFull || !canAdd)

  return (
    <>
      <AppendedHeader />
      <div id='characterDetailsContainer'>
        <div id="detailsTopBar">
          <h1 id="detailsName">{name}</h1>
          <button id='add' onClick={handleClick} disabled={checkDisabled}>
            {checkTeam}
          </button>
        </div>

        <div id="characterDetails">
          <div id="detailImgWrap">
            <img id="detailImg" src={image} alt={name} />
          </div>

          <div id="details">
            <div id="detailsPanel">
              <h2 id="bioTitle">Biography</h2>
              <p id="bioText">{description}</p>
            </div>

            <div id="statsPanel">
              <h2 id="statsTitle">Stats</h2>
              <div className="statRow"><span>Level</span><span>{level}</span></div>
              <div className="statRow"><span>Gender</span><span>{gender}</span></div>
              <div className="statRow"><span>Race</span><span>{race}</span></div>
              <div className="statRow"><span>Affiliation</span><span>{affiliation}</span></div>
              <div className="statRow"><span>Ki</span><span>{ki.toLocaleString()}</span></div>
              <div className="statRow"><span>Max Ki</span><span>{maxKi.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}