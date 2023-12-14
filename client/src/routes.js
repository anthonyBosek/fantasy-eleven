import App from "./App";
import ErrorPage from "./components/errorPage";
import Home from "./pages/home";
import Authentication from "./features/user/auth";
import PremierLeague from "./pages/premierLeague";
import Fantasy from "./pages/fantasy";
import Dashboard from "./pages/dashboard";
import LeagueForm from "./components/leagueForm";
import TeamForm from "./components/teamForm";
import TeamView from "./components/teamView";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/auth",
        element: <Authentication />,
      },
      {
        path: "/premier-league",
        element: <PremierLeague />,
      },
      {
        path: "/fantasy",
        element: <Fantasy />,
      },
      {
        path: "/users/:id/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/leagues/new",
        element: <LeagueForm />,
      },
      {
        path: "/leagues/:id/edit",
        element: <LeagueForm />,
      },
      {
        path: "/leagues/:id/teams/new",
        element: <TeamForm />,
      },
      {
        path: "/teams/:id/edit",
        element: <TeamView />,
      },
    ],
  },
];

export default routes;
