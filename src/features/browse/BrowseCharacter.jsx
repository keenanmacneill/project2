import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../../context/AppContext'

export default function BrowseCharacter({ character }) {
  const { name, image, level } = character
  const navigate = useNavigate()
  const { setCharacterDetails } = useContext(AppContext)

  const handleClick = () => {
    localStorage.setItem("details", JSON.stringify(character))
    setCharacterDetails(character)
    navigate(`/character/${name}`)
  }

  if (!character) return 'Loading...'

  return (
    <>
      <div id={name.toLowerCase()} className='characterCard' onClick={handleClick}>
        <img src={image} />
        <div id='nameField'>
          <p id='name'>{name}</p>
          <div id='level'>
            <p>Lv.</p>
            <p>{level}</p>
          </div>
        </div>
      </div>
    </>
  )
}