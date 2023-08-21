import { useContext } from "react";

import { AuthContext } from "../stores/AuthContext";

function useAuth() {
  const { user, initialized } = useContext(AuthContext);
  return { user, initialized };
}

export default useAuth;
