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
    <AuthContext.Provider value={{ user }}>
      {user === undefined ? (
        <div className="fixed left-0 top-0 z-20 flex h-screen w-full items-center justify-center bg-yellow-200">
          <div className="flex items-center justify-center gap-3">
            <div className="h-6 w-6 animate-[bounce_1s_infinite_-0.3s] rounded-full bg-yellow-400"></div>
            <div className="h-6 w-6 animate-[bounce_1s_infinite_-0.1s] rounded-full bg-yellow-400"></div>
            <div className="h-6 w-6 animate-[bounce_1s_infinite_0.1s] rounded-full bg-yellow-400"></div>
          </div>
        </div>
      ) : null}
      {children}
    </AuthContext.Provider>
  );
}
