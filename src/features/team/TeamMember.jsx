import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../../context/AppContext'

export default function TeamMember({ character }) {
  const { setCharacterDetails } = useContext(AppContext)
  const { name, image } = character
  const navigate = useNavigate()
  const handleClick = () => {
    setCharacterDetails(character)
    navigate(`/characters/${name}`)
  }

  return (
    <div className='characterCard'>
      <img src={image} onClick={handleClick} />
      <p id='name'>{name}</p>
    </div>
  )
}