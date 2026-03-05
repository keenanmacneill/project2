import { useContext, useEffect, useState } from "react"
import AppContext from "../../context/AppContext"
import { useNavigate } from "react-router-dom"
import "./Rounds.css"
import round1 from "/round1.png"
import round2 from "/round2.png"
import round3 from "/round3.png"

export default function Rounds() {
  const { team, characters } = useContext(AppContext)
  const [friendlyTeam, setFriendlyTeam] = useState([])
  const [enemyTeam, setEnemyTeam] = useState([])
  const [round, setRound] = useState(1)
  const backgrounds = [round1, round2, round3]
  const currBackground = backgrounds[round - 1]
  const navigate = useNavigate()
  const quit = () => {
    navigate('/')
  }

  const makeFighter = c => {
    const { maxKi } = c
    const rating = Math.log10(maxKi + 1);
    const maxHP = Math.round(80 + rating * 35);
    const atk = Math.round(10 + rating * 6);
    const def = Math.round(6 + rating * 3);
    const heal = Math.round(8 + rating * 3);

    return {
      id: c.id,
      name: c.name,
      race: c.race,
      image: c.image,
      maxKi,
      rating,
      stats: { maxHP, atk, def, heal },
      hp: maxHP,
      defending: false,
    };
  }

  useEffect(() => {
    const tempFriendly = []
    for (const c of team) {
      tempFriendly.push(makeFighter(c))
    }
    setFriendlyTeam(tempFriendly)
  }, [team])

  useEffect(() => {
    if (!characters?.length || !team?.length) return;

    const teamIds = new Set(team.map(t => t.id));
    const pool = characters.filter(c => c && !teamIds.has(c.id));
    if (!pool.length) return;
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    const enemies = shuffled.slice(0, 2).map(makeFighter)
    setEnemyTeam(enemies)
  }, [characters, team]);

  return (
    <div id='roundContainer' style={{ backgroundImage: `url(${currBackground})` }}>
      <div id='roundHeader'>
        <h1 id='roundTitle'>Battle Round {round} of 3</h1>
        <button id='quit' onClick={quit}>Quit</button>
      </div>
      <div id='arena'>
        <div id="friendlyTeamContainer">
          <div id='friendlyTeam'>
            {friendlyTeam.map(c => <img key={c.id} src={c.image} alt={c.name} />)}
          </div>
          <div id='friendlyHealth'>
            <p>{friendlyTeam[0].name} and {friendlyTeam[1].name}</p>
            <p>HP: {friendlyTeam.reduce((s, a) => s + a.hp, 0)}</p>
          </div>
        </div>
        <div id='enemyTeamContainer'>
          <div id="enemyTeam">
            {enemyTeam.map((c, i) => <img key={c.id} src={c.image} alt={c.name} style={{ zIndex: 10 - i }} />)}
          </div>
          <div id='enemyHealth'>
            <p>{enemyTeam[0].name} and {enemyTeam[1].name}</p>
            <p>HP: {enemyTeam.reduce((s, a) => s + a.hp, 0)}</p>
          </div>
        </div>
      </div>
      <div id='moves'>
        <button id='attack'>Attack</button>
        <button id='defend'>Defend</button>
        <button id='heal'>Heal</button>
      </div>
    </div >
  )
}