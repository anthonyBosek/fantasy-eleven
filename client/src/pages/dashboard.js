import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import LeagueCard from "../components/leagueCard";
import { getCookie } from "../utils/main";
// import TeamCard from "../components/teamCard";

//! ----------- Material UI Table -----------------------------------------------------------------
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TeamRow from "../components/teamRow";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
//! -----------------------------------------------------------------------------------------------

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const getLeagues = async () => {
      try {
        const res = await axios.get("/leagues");
        setLeagues(res.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getLeagues();
    const getTeams = async () => {
      try {
        const res = await axios.get("/teams");
        setTeams(res.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getTeams();
  }, []);

  const handleFormToggle = () => navigate("/leagues/new");

  const handleLeagueEdit = (id) => navigate(`/leagues/${id}/edit`);

  const handleTeamAdd = (id) => navigate(`/leagues/${id}/teams/new`);

  const handleTeamDisplay = (id) => navigate(`/teams/${id}/edit`);

  const handleTeamDelete = (id) => {
    console.log("del team", id);
  };

  const handleLeagueDelete = async (id) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: `/leagues/${id}`,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCookie("csrf_access_token"),
        },
      });
      if (res.status === 200) {
        try {
          const res = await axios.get("/leagues");
          setLeagues(res.data);
          setTeams((prev) => prev.filter((team) => team.league_id !== id));
        } catch (error) {
          toast.error(error.message);
        }
      }
      toast.success("League deleted");
      navigate(`/users/${user.id}/dashboard/`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const allLeagues = leagues.map(
    (league) =>
      league.manager_id === user?.id && (
        <LeagueCard
          key={league.id}
          isOwn={true}
          league={league}
          handleAdd={handleTeamAdd}
          handleEdit={handleLeagueEdit}
          handleDelete={handleLeagueDelete}
        />
      )
  );

  const allTeams = teams.map(
    (team) =>
      team.owner_id === user?.id && (
        <TeamRow
          key={team.id}
          team={team}
          handleTeamDisplay={handleTeamDisplay}
          // handleDelete={handleTeamDelete}
        />
      )
  );

  return (
    <div id="dashboard">
      <h1>Dashboard</h1>
      <button onClick={handleFormToggle}>Create New League</button>
      <h2>Leagues as Owner</h2>
      {allLeagues}
      <h2>Teams</h2>
      <TableContainer component={Paper}>
        <Table
          sx={{ maxWidth: "80vw", margin: "auto" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Team Name</StyledTableCell>
              <StyledTableCell align="center">Owner Name</StyledTableCell>
              <StyledTableCell align="center">League Name</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              {/* <StyledTableCell align="center">Delete</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>{allTeams}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
