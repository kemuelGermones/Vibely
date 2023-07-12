import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { AuthContext } from "../store/auth-context";

function Protected() {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/signin" />;
}

export default Protected;
