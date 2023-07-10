import { Outlet, Navigate } from "react-router-dom";

function Unprotected() {
  return true ? <Outlet /> : <Navigate to="/posts" />;
}

export default Unprotected;
