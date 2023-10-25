import { useState, useEffect } from "react";

import useSocket from "./useSocket";

function useMessages(value) {
  const [messages, setMessages] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (value) {
      setMessages(value.pages.reduce((prev, next) => [...prev, ...next]));
    }
  }, [value]);

  useEffect(() => {
    socket.current.on("receive_message", handleSetMessages);

    return () => {
      socket.current.off("receive_message", handleSetMessages);
    };
  }, []);

  const handleSetMessages = (message) => {
    setMessages((state) => [message, ...state]);
  };

  return messages;
}

export default useMessages;
