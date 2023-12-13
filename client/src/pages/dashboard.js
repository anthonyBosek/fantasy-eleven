import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios, { all } from "axios";
import LeagueForm from "../components/leagueForm";
import toast from "react-hot-toast";
import { getCookie } from "../utils/main";
import LeagueCard from "../components/leagueCard";

const Dashboard = () => {
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

  const handleLeagueEdit = () => {
    //! Patch axios request
    console.log("edit");
  };

  const allLeagues = leagues.map(
    (league) =>
      league.manager_id === user.id && (
        <LeagueCard
          key={league.id}
          isOwn={true}
          league={league}
          handleClick={handleLeagueEdit}
        />
      )
  );

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Leagues as Owner</h2>
      {allLeagues}
    </div>
  );
};

export default Dashboard;
