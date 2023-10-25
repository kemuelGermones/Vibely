import { useContext } from "react";

import { SocketContext } from "../stores/SocketContext";

function useSocket() {
  return useContext(SocketContext);
}

export default useSocket;
