import { useContext } from "react"
import AppContext from "./AppContext"
import AppendedHeader from "./AppendedHeader"

export default function CharacterDetails() {
  const { characterDetails } = useContext(AppContext)
  const { name, ki, maxKi, race, gender, description, image, affiliation } = characterDetails
  const { setTeam, team } = useContext(AppContext)
  const handleClick = () => {
    const tempArray = team
    const newArr = [...tempArray.filter(c => c.name !== name), characterDetails]
    setTeam(newArr)
  }

  return (
    <>
      <AppendedHeader />
      <div id='characterDetailsContainer'>
        <h1>{name}</h1>
        <button id='add' onClick={handleClick}>{team.includes(name) ? 'Remove from Team' : 'Add to Team'}</button>
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