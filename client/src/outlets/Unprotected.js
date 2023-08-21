import { Outlet, Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function Unprotected() {
  const { user } = useAuth();

  return !user ? <Outlet /> : <Navigate to="/posts" />;
}

export default Unprotected;
