import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../../../context/AppContext'

export default function TeamMember({ character }) {
  const { setCharacterDetails } = useContext(AppContext)
  const { name, image, race } = character
  const navigate = useNavigate()
  const handleClick = () => {
    setCharacterDetails(character)
    navigate(`/characters/${name}`)
  }

  return (
    <div className='characterCard'>
      <img src={image} onClick={handleClick} />
      <div id='nameField'>
        <p id='name'>{name}</p>
        {/* {race === 'Saiyan' ? <p id='saiyanTag'>S</p> : ''} */}
      </div>
    </div>
  )
}