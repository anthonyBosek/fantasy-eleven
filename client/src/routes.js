import App from "./App";
import ErrorPage from "./components/errorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // {
      //   path: "/",
      //   index: true,
      //   element: <HomePage />,
      // },
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
