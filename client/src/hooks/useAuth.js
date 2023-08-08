import { useContext } from "react";

import { AuthContext } from "../store/auth-context";

function useAuth() {
  const { user, initialized } = useContext(AuthContext);
  return { user, initialized };
}

export default useAuth;
