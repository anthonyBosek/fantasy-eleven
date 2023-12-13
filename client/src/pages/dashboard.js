import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import LeagueCard from "../components/leagueCard";
import { getCookie } from "../utils/main";

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

  const handleTeamAdd = (id) => {
    console.log("add");
    navigate(`/leagues/${id}/teams/new`);
  };
  const handleTeamEdit = () => {};
  const handleTeamDelete = () => {};

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
        } catch (error) {
          toast.error(error.message);
        }
      }
      toast.success("League deleted");
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

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleFormToggle}>Create New League</button>
      <h2>Leagues as Owner</h2>
      {allLeagues}
    </div>
  );
};

export default Dashboard;
