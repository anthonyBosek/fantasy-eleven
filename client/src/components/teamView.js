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
import { getCookie, SPOTS } from "../utils/main";
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

const TeamCard = () => {
  const { id } = useParams();
  const [team, setTeam] = useState({});
  const [addToggle, setAddToggle] = useState(false);
  const [roster, setRoster] = useState({});

  const initialRoster = {
    Goalkeeper: 0,
    Defender: 0,
    Midfielder: 0,
    Attacker: 0,
  };

  const rosterCheck = (pos) => {
    if (pos === "Goalkeeper") {
      if (roster[pos] === 1) {
        toast.error("You can only have one goalkeeper");
      } else {
        initialRoster[pos] += 1;
        return true;
      }
    } else if (pos === "Defender") {
      if (roster[pos] === 4) {
        toast.error("You can only have four defenders");
      } else {
        initialRoster[pos] += 1;
        return true;
      }
    } else if (pos === "Midfielder") {
      if (roster[pos] === 3) {
        toast.error("You can only have three midfielders");
      } else {
        initialRoster[pos] += 1;
        return true;
      }
    } else if (pos === "Attacker") {
      if (roster[pos] === 3) {
        toast.error("You can only have three attackers");
      } else {
        initialRoster[pos] += 1;
        return true;
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
        res.data.players.map(({ position }) => {
          rosterCheck(position);
        });
        setRoster(initialRoster);
        setTeam(res.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (id) {
      getTeam();
    }
  }, [id]);

  const handleAdd = () => {
    setAddToggle(!addToggle);
  };

  const handleDrop = (_id) => {
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
        console.log(res.data);
        if (res.status === 200) {
          try {
            const res = await axios({
              method: "GET",
              url: `/teams/${id}`,
              headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": getCookie("csrf_access_token"),
              },
            });
            setRoster(initialRoster);
            setTeam(res.data);
          } catch (error) {
            toast.error(error.message);
          }
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
      id={id}
      data_num={data_num}
      handleDrop={handleDrop}
    />
  ));

  return (
    <div>
      <h1>TeamCard</h1>
      <h2>{team.name}</h2>
      <h2>{team.league?.name}</h2>
      <button onClick={handleAdd}>Add Player</button>
      {addToggle && <h2>add player form</h2>}
      <TableContainer component={Paper}>
        <Table
          sx={{ maxWidth: "80vw", margin: "auto" }}
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

export default TeamCard;
