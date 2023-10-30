import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function Unprotected() {
  const { user } = useAuth();

  return !user ? <Outlet /> : <Navigate to="/posts" replace />;
}

export default Unprotected;
