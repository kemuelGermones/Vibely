import { Routes, Route, Navigate } from "react-router-dom";

import Signin from "./pages/Signin";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import Error from "./pages/Error";
import Messages from "./pages/Messages";
import Signup from "./pages/Signup";
import Unprotected from "./outlet/Unprotected";
import Protected from "./outlet/Protected";

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="signin" />} />
      <Route element={<Unprotected />}>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route element={<Protected />}>
        <Route path="posts" element={<Posts />} />
        <Route path="messages" element={<Messages />} />
        <Route path="users" element={<Users />} />
        <Route path="error" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
