import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { randomThumb } from "../utils/main";
import { Button } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

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

const TeamRow = ({ team, handleTeamDisplay }) => {
  // const user = useSelector((state) => state.user.data);

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
          image={randomThumb()}
          alt={team.name}
        />
        {team.name}
      </StyledTableCell>
      <StyledTableCell align="center">{team.owner.username}</StyledTableCell>
      <StyledTableCell align="center">{team.league.name}</StyledTableCell>
      <StyledTableCell align="center">
        <Button
          size="small"
          variant="contained"
          onClick={() => handleTeamDisplay(team.id)}
        >
          View Team
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

export default TeamRow;
