import CharacterDetails from "./CharacterDetails"

export default function TeamMember({ character }) {
  const { name, image } = character

  return (
    <div className='characterCard'>
      <img src={image} />
      <p>{name}</p>
    </div>
  )
}