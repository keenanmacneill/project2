import { useContext } from "react"
import AppContext from "./AppContext"
import AppendedHeader from "./AppendedHeader"

export default function CharacterDetails() {
  const { characterDetails } = useContext(AppContext)
  const { name, ki, maxKi, race, gender, description, image, affiliation } = characterDetails
  const { setTeam, team } = useContext(AppContext)
  const inTeam = team.some(char => char.name === name)
  const teamFull = team.length >= 6
  const saiyanCount = team.filter(c => c.race === "Saiyan").length
  const canAddSaiyan = saiyanCount < 2
  const handleClick = () => {
    inTeam
      ? setTeam(prev => prev.filter(c => c.name !== name))
      : setTeam(prev => [...prev, characterDetails])
  }
  const checkTeam = inTeam
    ? 'Remove from Team'
    : race === 'Saiyan' && !canAddSaiyan
      ? 'Max Saiyans'
      : teamFull
        ? 'Team is full'
        : 'Add to Team'
  const checkDisabled = !inTeam && (teamFull || (race === 'Saiyan' && !canAddSaiyan))

  return (
    <>
      <AppendedHeader />
      <div id='characterDetailsContainer'>
        <h1>{name}</h1>
        <button id='add' onClick={handleClick} disabled={checkDisabled}>
          {checkTeam}
        </button>
        <div id="characterDetails">
          <img id="detailImg" src={image} />
          <div id="details">
            <p>Gender: {gender}</p>
            <p>Race: {race}</p>
            <p>Affiliation: {affiliation}</p>
            <p>Ki: {ki}</p>
            <p>Max Ki: {maxKi}</p>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </>
  )
}