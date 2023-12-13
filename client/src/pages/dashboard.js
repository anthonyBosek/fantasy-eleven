import { useSelector } from "react-redux";
import LeagueForm from "../components/leagueForm";

const Dashboard = () => {
  const user = useSelector((state) => state.user.data);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Shows user's leagues, teams, and players</h2>
      {console.log(user)}
      <h2>Create a league</h2>
      <LeagueForm />
    </div>
  );
};

export default Dashboard;
