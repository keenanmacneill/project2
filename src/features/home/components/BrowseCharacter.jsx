import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../../../context/AppContext'

export default function BrowseCharacter({ character }) {
  const { name, image } = character
  const navigate = useNavigate()
  const { setCharacterDetails } = useContext(AppContext)
  const handleClick = () => {
    setCharacterDetails(character)
    navigate(`/characters/${name}`)
  }

  if (!character) return 'Loading...'

  return (
    <>
      <div id={name.toLowerCase()} className='characterCard' onClick={handleClick}>
        <img src={image} />
        <p>{name}</p>
      </div>
    </>
  )
}