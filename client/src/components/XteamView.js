import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getCookie } from "../utils/main";
import PlayerRow from "./playerRow";
import AllPlayersTable from "./playerView";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TeamView = () => {
  const { id } = useParams();
  const [team, setTeam] = useState({});
  const [addToggle, setAddToggle] = useState(false);
  const [roster, setRoster] = useState({
    Gk: null,
    D1: null,
    D2: null,
    D3: null,
    D4: null,
    M1: null,
    M2: null,
    M3: null,
    A1: null,
    A2: null,
    A3: null,
  });

  const handleRoster = (player) => {
    const { position } = player;
    if (position === "Goalkeeper") {
      if (roster.Gk) {
        toast.error("You can only have one goalkeeper");
      } else {
        setRoster({ ...roster, Gk: player });
      }
    } else if (position === "Defender") {
      for (let i = 1; i < 5; i++) {
        if (roster[`D${i}`] === null) {
          setRoster({ ...roster, [`D${i}`]: player });
          break;
        } else if (i === 4) {
          toast.error("You can only have four defenders");
        }
      }
    } else if (position === "Midfielder") {
      for (let i = 1; i < 4; i++) {
        if (roster[`M${i}`] === null) {
          setRoster({ ...roster, [`M${i}`]: player });
          break;
        } else if (i === 3) {
          toast.error("You can only have three midfielders");
        }
      }
    } else if (position === "Attacker") {
      for (let i = 1; i < 4; i++) {
        if (roster[`A${i}`] === null) {
          setRoster({ ...roster, [`A${i}`]: player });
          break;
        } else if (i === 3) {
          toast.error("You can only have three attackers");
        }
      }
    }
  };

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
        res.data.players.map((player) => {
          handleRoster(player);
        });
        setTeam(res.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (id) {
      getTeam();
    }
  }, [id, addToggle]);

  const handleAdd = () => {
    setAddToggle(!addToggle);
  };

  const handleDrop = (player) => {
    const _id = team.players.filter((obj) => obj.data_num === player.id)[0].id;
    const dropPlayer = async () => {
      try {
        const res = await axios({
          method: "DELETE",
          url: `/players/${_id}`,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": getCookie("csrf_access_token"),
          },
        });
        // console.log(res.data);
        if (res.status === 200) {
          toast.success(`${player.name} dropped from roster`);
          setAddToggle(false);
          // try {
          //   const res = await axios({
          //     method: "GET",
          //     url: `/teams/${id}`,
          //     headers: {
          //       "Content-Type": "application/json",
          //       "X-CSRF-TOKEN": getCookie("csrf_access_token"),
          //     },
          //   });
          //   res.data.players.map((player) => {
          //     handleRoster(player);
          //   });
          //   setTeam(res.data);
          // } catch (error) {
          //   toast.error(error.message);
          // }
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    dropPlayer();
  };

  const allPlayers = team.players?.map(({ id, data_num }) => (
    <PlayerRow
      key={`player-${id}`}
      data_num={data_num}
      handleClick={handleDrop}
    />
  ));

  return (
    <div>
      <h1>TeamView</h1>
      <h2>{team.name}</h2>
      <h2>{team.league?.name}</h2>
      <button onClick={handleAdd}>Add Player</button>
      {addToggle && <AllPlayersTable handleRoster={handleRoster} />}
      <hr />
      <TableContainer component={Paper}>
        <Table
          sx={{ maxWidth: "80vw", margin: "20px auto" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center">Jersey #</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Position</StyledTableCell>
              <StyledTableCell align="center">Team</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{allPlayers}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TeamView;
