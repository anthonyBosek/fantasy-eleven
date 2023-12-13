import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import LeagueForm from "../components/leagueForm";
import toast from "react-hot-toast";
import { getCookie } from "../utils/main";

const Dashboard = () => {
  const user = useSelector((state) => state.user.data);
  const [league, setLeague] = useState({});
  const [allLeagues, setAllLeagues] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const getLeagues = async () => {
      try {
        const res = await axios.get("/leagues");
        res.data.forEach((league) => {
          if (league.manager_id === user?.id) {
            setAllLeagues((prev) => [...prev, league]);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    getLeagues();
  }, [user?.id]);

  const handleEdit = (bool, league) => {
    setIsEdit(bool);
    setLeague(league);
    if (!bool) {
      setAllLeagues((prev) => [...prev, league]);
      setLeague({});
    }
  };

  const handleDelete = (id) => {
    const deleteLeague = async () => {
      try {
        const res = await axios({
          method: "DELETE",
          url: `/leagues/${id}`,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": getCookie("csrf_access_token"),
          },
        });
        console.log(res);
        setAllLeagues((prev) => prev.filter((league) => league.id !== id));
        toast.success("League deleted");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };
    deleteLeague();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Shows user's leagues, teams, and players</h2>
      {allLeagues.map((league) => (
        <div key={league.id}>
          <h2>{league.name}</h2>
          <button onClick={() => handleEdit(true, league)}>Edit</button>
          <button onClick={() => handleDelete(league.id)}>Delete</button>
        </div>
      ))}
      {!isEdit ? (
        <>
          <h2>Create a league</h2>
          <LeagueForm handleEdit={handleEdit} />
        </>
      ) : (
        <>
          <h2>Edit a league</h2>
          <LeagueForm isEdit={true} handleEdit={handleEdit} league={league} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
