import { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../config/firebase";
import Bubble from "../components/ui/Bubble";

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
    <AuthContext.Provider value={{ user }}>
      {user === undefined ? (
        <div className="fixed left-0 top-0 z-20 flex h-screen w-full items-center justify-center bg-yellow-200">
          <Bubble />
        </div>
      ) : null}
      {children}
    </AuthContext.Provider>
  );
}
