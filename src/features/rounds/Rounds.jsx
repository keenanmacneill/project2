import { useContext, useEffect, useMemo, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import "./Rounds.css";
import round1 from "/round1.png";
import round2 from "/round2.png";
import round3 from "/round3.png";

export default function Rounds() {
  const { team, characters } = useContext(AppContext);
  const [friendlyTeam, setFriendlyTeam] = useState([]);
  const [enemyTeam, setEnemyTeam] = useState([]);
  const [round, setRound] = useState(1);
  const backgrounds = [round1, round2, round3];
  const currBackground = backgrounds[round - 1];
  const navigate = useNavigate();
  const quit = () => navigate("/myteam");
  const makeFighter = (c) => {
    const { maxKi } = c;
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
  };

  useEffect(() => {
    const tempFriendly = [];
    for (const c of team) tempFriendly.push(makeFighter(c));
    setFriendlyTeam(tempFriendly);
  }, [team]);

  useEffect(() => {
    if (!characters?.length || !team?.length) return;

    const teamIds = new Set(team.map((t) => t.id));
    const pool = characters.filter((c) => c && !teamIds.has(c.id));
    if (!pool.length) return;

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const enemies = shuffled.slice(0, 2).map(makeFighter);
    setEnemyTeam(enemies);
  }, [characters, team]);

  const sums = useMemo(() => {
    const sum = (arr, k) => arr.reduce((s, a) => s + (a?.[k] ?? 0), 0);
    const sumMax = (arr) => arr.reduce((s, a) => s + (a?.stats?.maxHP ?? 0), 0);

    const fHP = sum(friendlyTeam, "hp");
    const eHP = sum(enemyTeam, "hp");
    const fMax = sumMax(friendlyTeam);
    const eMax = sumMax(enemyTeam);

    const clampPct = (hp, max) => {
      if (!max) return 0;
      const pct = (hp / max) * 100;
      return Math.max(0, Math.min(100, pct));
    };

    return {
      fHP,
      eHP,
      fMax,
      eMax,
      fPct: clampPct(fHP, fMax),
      ePct: clampPct(eHP, eMax),
      fName: friendlyTeam.map((c) => c?.name).filter(Boolean).join(" • "),
      eName: enemyTeam.map((c) => c?.name).filter(Boolean).join(" • "),
    };
  }, [friendlyTeam, enemyTeam]);

  return (
    <div id="roundContainer" style={{ backgroundImage: `url(${currBackground})` }}>
      <div id="screenVignette" />

      <div id="roundHeader">
        <h1 id="roundTitle">Battle Round {round} of 3</h1>
        <button id="quit" onClick={quit}>Quit</button>
      </div>

      <div id="hudRow">
        <div className="hudCard hudLeft">
          <div className="hudTop">
            <div className="hudName">{sums.fName || "—"}</div>
          </div>

          <div className="hudHPRow">
            <span className="hudTag">HP</span>
            <div className="hpBar">
              <div className="hpFill" style={{ width: `${sums.fPct}%` }} />
              <div className="hpGloss" />
            </div>
            <span className="hudValue">{(sums.fHP || 0).toLocaleString()}</span>
          </div>
        </div>

        <div className="hudCard hudRight">
          <div className="hudTop">
            <div className="hudName">{sums.eName || "—"}</div>
          </div>

          <div className="hudHPRow">
            <span className="hudTag">HP</span>
            <div className="hpBar">
              <div className="hpFill enemyFill" style={{ width: `${sums.ePct}%` }} />
              <div className="hpGloss" />
            </div>
            <span className="hudValue">{(sums.eHP || 0).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div id="arena">
        <div id="friendlyTeamContainer">
          <div id="friendlyTeam">
            {friendlyTeam.map((c) => (
              <img key={c.id} src={c.image} alt={c.name} />
            ))}
          </div>
        </div>

        <div id="enemyTeamContainer">
          <div id="enemyTeam">
            {enemyTeam.map((c, i) => (
              <img key={c.id} src={c.image} alt={c.name} style={{ zIndex: 10 - i }} />
            ))}
          </div>
        </div>
      </div>

      <div id="actionPanel">
        <div id='strikes'>Moves Remaining : {friendlyTeam.length}</div>
        <div id="moves">
          <button id="attack" className="moveBtn moveAttack">Attack!</button>
          <button id="defend" className="moveBtn moveDefend">Defend</button>
          <button id="heal" className="moveBtn moveHeal">Heal</button>
        </div>
      </div>
    </div>
  );
}