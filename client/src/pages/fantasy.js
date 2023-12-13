import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import LeagueCard from "../components/leagueCard";

const Fantasy = () => {
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

  const handleJoin = () => {
    //! JOIN league means make new team
    console.log("join");
  };

  const allLeagues = leagues.map(
    (league) =>
      league.manager_id !== user?.id && (
        <LeagueCard key={league.id} league={league} handleClick={handleJoin} />
      )
  );

  return (
    <div>
      <h1>Fantasy</h1>
      <h2>Show all existing Fantasy leagues as cards</h2>
      {allLeagues}
    </div>
  );
};

export default Fantasy;
