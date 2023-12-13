import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user.data);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Shows user's leagues, teams, and players</h2>
      {console.log(user)}
    </div>
  );
};

export default Dashboard;
