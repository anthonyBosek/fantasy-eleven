import App from "./App";
import ErrorPage from "./components/errorPage";
import Home from "./pages/home";
import Authentication from "./features/user/auth";
import PremierLeague from "./pages/premierLeague";
import Fantasy from "./pages/fantasy";
import Dashboard from "./pages/dashboard";

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
    ],
  },
];

export default routes;
