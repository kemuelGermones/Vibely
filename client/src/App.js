import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Unprotected from "./outlets/Unprotected";
import Protected from "./outlets/Protected";
import Loading from "./pages/Loading";
import Fallback from "./pages/Fallback";

const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Posts = lazy(() => import("./pages/Posts"));
const Inbox = lazy(() => import("./pages/Inbox"));
const Profile = lazy(() => import("./pages/Profile"));
const Error = lazy(() => import("./pages/Error"));

function App() {
  const { initialized } = useAuth();

  if (!initialized) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route index element={<Navigate to="/signin" replace />} />
      <Route element={<Unprotected />}>
        <Route
          path="/signin"
          element={
            <Suspense fallback={<Fallback />}>
              <Signin />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<Fallback />}>
              <Signup />
            </Suspense>
          }
        />
      </Route>
      <Route element={<Protected />}>
        <Route
          path="/posts"
          element={
            <Suspense fallback={<Fallback />}>
              <Posts />
            </Suspense>
          }
        />
        <Route
          path="/inbox"
          element={
            <Suspense fallback={<Fallback />}>
              <Inbox />
            </Suspense>
          }
        />
        <Route
          path="/users/:userId"
          element={
            <Suspense fallback={<Fallback />}>
              <Profile />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <Suspense fallback={<Fallback />}>
            <Error />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
