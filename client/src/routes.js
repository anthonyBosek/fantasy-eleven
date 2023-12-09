import App from "./App";
import ErrorPage from "./components/errorPage";
import Nav from "./components/navbar";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        element: <Nav />,
      },
      //   {
      //     path: "/",
      //     element: <Authentication />
      //   },
      //   {
      //     path: "/users/:id/dashboard",
      //     element: <Dashboard />,
      //   },
    ],
  },
];

export default routes;
