import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Error from "./pages/Error/Error.jsx";
import Search from "./pages/SearchPage/Search.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Sharer from "./pages/Sharer/Sharer.jsx";
import Inbox from "./pages/Indbox/Inbox.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/inbox",
        element: <Inbox />,
      },
      {
        path: "/sharer/:userId",
        element: <Sharer />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
