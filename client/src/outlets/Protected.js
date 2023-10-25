import { Outlet, Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function Protected() {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/signin" replace />;
}

export default Protected;
