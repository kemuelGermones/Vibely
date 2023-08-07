import { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../config/firebase";

export const AuthContext = createContext({
  user: null,
  initialized: false,
});

export function AuthContextProvider({ children }) {
  const [client, setClient] = useState({ user: null, initialized: false });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setClient({ user, initialized: true });
    });

    return () => unsub();
  }, []);

  return <AuthContext.Provider value={client}>{children}</AuthContext.Provider>;
}
