import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { getCookie } from "../utils/main";
// import { LINEUP } from "../utils/main";
import "../styles/teamView.css";
import PlayerCardSmall from "./playerCardSmall";
// ---------------------------------------------------------------
import AllPlayersTable from "./playerView";
// ---------------------------------------------------------------

const TeamView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const [team, setTeam] = useState(null); //! entire db data
  const [lineup, setLineup] = useState({
    Goalkeeper: [],
    Defender: [],
    Midfielder: [],
    Attacker: [],
  }); //! local state for display and logic
  // ---------------------------------------------------------------
  const [addToggle, setAddToggle] = useState(false);
  // ---------------------------------------------------------------

  useEffect(() => {
    const getTeam = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `/teams/${id}`,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": getCookie("csrf_access_token"),
          },
        });
        setTeam(res.data);
        res.data.players.map((player) => {
          setLineup((prev) => ({
            ...prev,
            [player.position]: [...prev[player.position], player],
          }));
        });
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (id) {
      getTeam();
    }
  }, [id]);

  // ----
  const handleAdd = () => {
    setAddToggle(!addToggle);
  };
  const handleTeamUpdate = (player) => {
    // locate first undefined position, then replace with player, use setLineup to update state and trigger re-render
    // go to array at player.position, find first undefined, replace with player
    // setLineup((prev) => {
    //   const position = player.position;
    //   const newArr = [];
    //   let used = false;
    //   for (let i = 0; i < prev[position].length; i++) {
    //     if (prev[position][i] === undefined && !used) {
    //       newArr.push(player);
    //       used = true;
    //     } else {
    //       newArr.push(prev[position][i]);
    //     }
    //   }
    //   return {
    //     ...prev,
    //     [position]: newArr,
    //   };
    // });
    // const position = player.position;
    // const newArr = [];
    // let used = false;
    // for (let i = 0; i < lineup[position].length; i++) {
    //   if (lineup[position][i] === undefined && !used) {
    //     newArr.push(player);
    //     used = true;
    //   } else {
    //     newArr.push(lineup[position][i]);
    //   }
    // }
    // setLineup((prev) => ({
    //   ...prev,
    //   [position]: newArr,
    // }));
    // const index = lineup[player.position].indexOf(undefined);
    // setLineup((prev) => ({
    //   ...prev,
    //   [player.position]: [
    //     ...prev[player.position].slice(0, index),
    //     player,
    //     ...prev[player.position].slice(index + 1),
    //   ],
    // }));
    setLineup((prev) => ({
      ...prev,
      [player.position]: [...prev[player.position], player],
    }));
  };
  // ---------

  const handleDrop = (id) => {
    // get player data and index from lineup -> then empty that index in lineup and update state
    const player = team.players.filter((player) => player.id === id)[0];
    const index = lineup[player.position].indexOf(player);
    const dropPlayer = async () => {
      try {
        const res = await axios({
          method: "DELETE",
          url: `/players/${id}`,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": getCookie("csrf_access_token"),
          },
        });
        if (res.status === 200) {
          toast.success(`${player.name} dropped from roster`);
          const newLineup = lineup;
          newLineup[player.position][index] = undefined;
          setLineup(newLineup);
          navigate(`/teams/${team.id}/edit`);
          //! this is where I need to some how refresh the page to reflect the change
          //   try {
          //     const res = await axios({
          //       method: "GET",
          //       url: `/teams/${team.id}`,
          //       headers: {
          //         "Content-Type": "application/json",
          //         "X-CSRF-TOKEN": getCookie("csrf_access_token"),
          //       },
          //     });
          //     setTeam(res.data);
          //     res.data.players.map((player) => {
          //       setLineup((prev) => ({
          //         ...prev,
          //         [player.position]: [...prev[player.position], player],
          //       }));
          //     });
          //   } catch (error) {
          //     toast.error(error.message);
          //   }
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    dropPlayer();
  };

  // const handleAdd = () => {};

  const currentLineup = () => {
    const p = { Goalkeeper: 1, Defender: 4, Midfielder: 3, Attacker: 3 };
    const lineupGrid = [];
    for (const [position, players] of Object.entries(lineup)) {
      for (let i = 0; i < p[position]; i++) {
        if (players[i] === undefined) {
          lineupGrid.push(<div key={`empty`}> Empty </div>);
        } else {
          lineupGrid.push(
            <PlayerCardSmall
              key={`lineup-${players[i].name}`}
              id={players[i].id}
              data_num={players[i].data_num}
              handleDrop={handleDrop}
            />
          );
        }
      }
    }
    return lineupGrid;
  };

  return (
    <div>
      {team && (
        <>
          {console.log(lineup)}
          <h1>{team.name}</h1>
          <h3>Players</h3>
          <div className="roster-grid">
            <div className="roster-grid-gk">Goalkeeper</div>
            <div className="roster-grid-df">Defender</div>
            <div className="roster-grid-df">Defender</div>
            <div className="roster-grid-df">Defender</div>
            <div className="roster-grid-df">Defender</div>
            <div className="roster-grid-mf">Midfielder</div>
            <div className="roster-grid-mf">Midfielder</div>
            <div className="roster-grid-mf">Midfielder</div>
            <div className="roster-grid-at">Attacker</div>
            <div className="roster-grid-at">Attacker</div>
            <div className="roster-grid-at">Attacker</div>
            {currentLineup()}
          </div>
          <hr />
          <button onClick={handleAdd}>Add Player</button>
          {addToggle && <AllPlayersTable handleTeamUpdate={handleTeamUpdate} />}
        </>
      )}
    </div>
  );
};

export default TeamView;
