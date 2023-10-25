import { useRef, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import io from "socket.io-client";

import auth from "../configs/firebase";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const SocketContext = createContext();

export function SocketContextProvider({ children }) {
  const socket = useRef(
    io(SERVER_URL, {
      autoConnect: false,
      auth: {
        token: null,
      },
    })
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { accessToken } = user;
        socket.current.auth.token = accessToken;
        socket.current.connect();
      } else {
        socket.current.disconnect();
      }
    });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    socket.current.on("connect_error", handleConnectError);
    socket.current.on("event_error", handleEventError);

    return () => {
      socket.current.off("connect_error", handleConnectError);
      socket.current.off("event_error", handleEventError);
    };
  }, []);

  const handleConnectError = (error) => {
    const { message } = error;
    toast.error(message, {
      theme: "colored",
    });
  };

  const handleEventError = (message) => {
    toast.error(message, { theme: "colored" });
  };

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
