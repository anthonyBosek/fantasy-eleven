import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Grid from "@mui/material/Grid";
import LeagueCard from "../components/leagueCard";
import { useNavigate } from "react-router-dom";

const Fantasy = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const getLeagues = async () => {
      try {
        const res = await axios.get("/leagues");
        setLeagues(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLeagues();
  }, []);

  const handleJoin = (id) => {
    //! JOIN league means make new team
    console.log("join");
    navigate(`/leagues/${id}/teams/new`);
  };

  const allLeagues = leagues.map(
    (league) =>
      league.manager_id !== user?.id && (
        <LeagueCard key={league.id} league={league} handleAdd={handleJoin} />
      )
  );

  return (
    <div>
      <h1>Fantasy</h1>
      <h2>Show all existing Fantasy leagues as cards</h2>
      <Grid container spacing={5}>
        {allLeagues}
      </Grid>
    </div>
  );
};

export default Fantasy;
