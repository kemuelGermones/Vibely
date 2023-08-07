import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "./store/auth-context";
import Signin from "./pages/Signin";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import Error from "./pages/Error";
import Messages from "./pages/Messages";
import Signup from "./pages/Signup";
import Unprotected from "./outlet/Unprotected";
import Protected from "./outlet/Protected";

function App() {
  const { initialized } = useContext(AuthContext);

  if (!initialized) {
    return (
      <main className="flex h-screen w-full items-center justify-center bg-yellow-200">
        <div className="flex gap-3">
          <div className="h-6 w-6 animate-[bounce_1s_infinite_-0.3s] rounded-full bg-yellow-400"></div>
          <div className="h-6 w-6 animate-[bounce_1s_infinite_-0.1s] rounded-full bg-yellow-400"></div>
          <div className="h-6 w-6 animate-[bounce_1s_infinite_0.1s] rounded-full bg-yellow-400"></div>
        </div>
      </main>
    );
  }

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
        <Route path="/users/:userId" element={<Users />} />
        <Route path="/error" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
