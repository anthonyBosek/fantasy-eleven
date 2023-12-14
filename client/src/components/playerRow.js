import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { randomThumb } from "../utils/main";
import { Button } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { getCookie } from "../utils/main";
import { ROSTERS } from "../assets/media/data";

const StyledTableCell = styled(TableCell)(() => ({
  //   [`&.${tableCellClasses.head}`]: {
  //     backgroundColor: "black",
  //     color: "white",
  //   },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#e9ecef",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  //   "&:hover": {
  //     cursor: "pointer",
  //   },
}));

const PlayerRow = ({ isAdd, data_num, handleClick }) => {
  // const user = useSelector((state) => state.user.data);
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

  //   const handleClick = () => handleDrop(id);

  return (
    <StyledTableRow>
      <StyledTableCell
        component="th"
        scope="row"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <CardMedia
          component="img"
          sx={{ width: 75, marginRight: 10 }}
          image={player.photo}
          alt={player.name}
        />
      </StyledTableCell>
      <StyledTableCell align="center">{player.number || "-"}</StyledTableCell>
      <StyledTableCell align="center">{player.name}</StyledTableCell>
      <StyledTableCell align="center">{player.position}</StyledTableCell>
      <StyledTableCell align="center">
        <CardMedia
          component="img"
          sx={{ width: 75, marginRight: 10 }}
          image={team.logo}
          alt={team.name}
        />
        {team.name}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Button
          size="small"
          variant="contained"
          onClick={() => handleClick(player)}
        >
          {isAdd ? "Add" : "Drop"} Player
        </Button>
      </StyledTableCell>
      {/* <StyledTableCell align="center">
        <Button
          size="small"
          variant="contained"
          onClick={() => handleDelete(team.id)}
        >
          Delete Team
        </Button>
      </StyledTableCell> */}
    </StyledTableRow>
  );
};

export default PlayerRow;
