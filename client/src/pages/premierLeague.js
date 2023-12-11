import { useState, useEffect } from "react";
import { TEAMS } from "../assets/media/data";
import axios from "axios";
import TeamCard from "../components/teamCard";
import Grid from "@mui/material/Grid";
import "../styles/premierLeague.css";

const PremierLeague = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    setTeams(TEAMS);
    // const fetchTeams = async () => {
    //   const res = await axios({
    //     method: "GET",
    //     url: "http://localhost:8888/teams",
    //   });
    //   if (res.status === 200) {
    //     setTeams(res.data);
    //   }
    // };
    // fetchTeams();
  }, []);

  const teamCards = teams.map(({ team, venue }) => {
    return <TeamCard key={team.id} team={team} venue={venue} />;
  });

  return (
    <div id="pl-container">
      <h1>PremierLeague</h1>
      <h2>Teams</h2>
      <div className="team-cards">
        <Grid container spacing={5}>
          {teamCards}
        </Grid>
      </div>
    </div>
  );
};

export default PremierLeague;
