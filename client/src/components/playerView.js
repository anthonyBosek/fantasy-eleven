import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ROSTERS } from "../assets/media/data";
import { getCookie } from "../utils/main";
import PlayerRow from "./playerRow";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const POSITIONS = ["Goalkeeper", "Defender", "Midfielder", "Attacker"];

const AllPlayersTable = ({ handleTeamUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const [data, setData] = useState(ROSTERS);
  const [team, setTeam] = useState(null);
  const [position, setPosition] = useState("all");

  const allShields = data.map(({ team }) => (
    <img
      key={`shield-${team.id}`}
      src={team.logo}
      alt={team.name}
      style={{ width: "70px" }}
      onClick={() => handleTeamSelect(team.id)}
    />
  ));

  const handleTeamSelect = (id) =>
    setTeam(data.filter((obj) => obj.team.id === id)[0]);

  const handleAdd = (player) => {
    const addPlayer = async () => {
      const values = {
        name: player.name,
        position: player.position,
        data_num: player.id,
        team_id: id,
      };
      try {
        const res = await axios({
          method: "POST",
          url: `/players`,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": getCookie("csrf_access_token"),
          },
          data: JSON.stringify(values),
        });
        console.log(res.data);
        toast.success(`${player.name} added to roster`);
        handleTeamUpdate(res.data);
        // navigate(`/users/${user.id}/dashboard/`);
      } catch (err) {
        toast.error(err.message);
      }
    };
    addPlayer();
  };

  const allPlayers = team
    ? team.players
        .filter((player) => {
          if (position === "all") {
            return player;
          } else {
            return player.position === position;
          }
        })
        .map((player) => (
          <PlayerRow
            key={`player-${player.id}`}
            isAdd={true}
            data_num={player.id}
            handleClick={handleAdd}
          />
        ))
    : null;

  return (
    <div>
      <h1>Premier League Players</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "20px",
        }}
      >
        {allShields}
      </div>
      <select onChange={(e) => setPosition(e.target.value)}>
        <option value="all">All</option>
        {POSITIONS.map((pos) => (
          <option key={`pos-${pos}`} value={pos}>
            {pos}
          </option>
        ))}
      </select>
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

export default AllPlayersTable;
