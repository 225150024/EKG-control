import { RouteObject } from "react-router-dom";
import SiteRoot from "../components/root";
import Home from "../pages/home";
import SignIn from "../pages/signin";
import TablePage from "../pages/myPermit";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <SiteRoot />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <SignIn />,
      },
      {
        path: "results",
        element: <TablePage />,
      },
    ],
  },
];

export default routes;
