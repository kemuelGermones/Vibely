import { Outlet, Navigate } from "react-router-dom";

function Protected() {
  return false ? <Outlet /> : <Navigate to="/signin" />;
}

export default Protected;
