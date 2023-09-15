import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Signin from "./pages/Signin";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import Inbox from "./pages/Inbox";
import Signup from "./pages/Signup";
import Unprotected from "./outlets/Unprotected";
import Protected from "./outlets/Protected";
import Loading from "./pages/Loading";

function App() {
  const { initialized } = useAuth();

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
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/users/:userId" element={<Profile />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    );
  }

  return <Loading />;
}

export default App;
