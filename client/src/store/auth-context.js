import { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../config/firebase";

export const AuthContext = createContext({
  user: null,
});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (client) => {
      setUser(client);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
