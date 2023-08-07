import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "./store/auth-context";
import Signin from "./pages/Signin";
import Posts from "./pages/Posts";
import UserProfile from "./pages/UserProfile";
import Error from "./pages/Error";
import Messages from "./pages/Messages";
import Signup from "./pages/Signup";
import Unprotected from "./outlet/Unprotected";
import Protected from "./outlet/Protected";
import Loading from "./pages/Loading";

function App() {
  const { initialized } = useContext(AuthContext);

  if (initialized) {
    return (
      <Routes>
        <Route index element={<Navigate to="/signin" />} />
        <Route element={<Unprotected />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<Protected />}>
          <Route path="/posts" element={<Posts />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/users/:userId" element={<UserProfile />} />
        </Route>
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    );
  }

  return <Loading />;
}

export default App;
