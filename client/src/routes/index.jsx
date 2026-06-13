import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

import SearchPage from "../pages/SearchPage";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
]);

export default router;
