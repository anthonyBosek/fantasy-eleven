import { useEffect, useState } from "react";
import { ROSTERS } from "../assets/media/data";

const PlayerCardSmall = ({ id, data_num, handleDrop }) => {
  const [team, setTeam] = useState({});
  const [player, setPlayer] = useState({});

  useEffect(() => {
    const getPlayer = () => {
      ROSTERS.filter(({ team, players }) => {
        players.filter((player) => {
          if (player.id === data_num) {
            setTeam(team);
            setPlayer(player);
          }
        });
      });
    };
    if (data_num) {
      getPlayer();
    }
  }, [data_num]);

  return (
    <div className={`roster-grid-${player.position}`}>
      <img src={player.photo} alt={player.name} style={{ width: "50px" }} />
      <img src={team.logo} alt={team.name} style={{ width: "50px" }} />
      <div>{player.name}</div>
      <button onClick={() => handleDrop(id)}>Drop</button>
    </div>
  );
};

export default PlayerCardSmall;
