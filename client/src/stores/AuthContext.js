import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import auth from "../configs/firebase";

const INITIAL_STATE = {
  user: null,
  initialized: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export function AuthContextProvider({ children }) {
  const [client, setClient] = useState(INITIAL_STATE);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setClient({ user, initialized: true });
    });

    return () => {
      unsub();
    };
  }, []);

  return <AuthContext.Provider value={client}>{children}</AuthContext.Provider>;
}
