import { Routes, Route, Navigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import Error from "./pages/Error";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="posts" element={<Posts />} />
        <Route path="messages" element={<Messages />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
        <Route path="error" element={<Error />} />
      </Routes>
      <Tooltip id="my-tooltip" place="bottom" />
    </>
  );
}

export default App;