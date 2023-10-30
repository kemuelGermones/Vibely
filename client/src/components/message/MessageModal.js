import { useEffect } from "react";

import useSocket from "../../hooks/useSocket";
import CreateMessageForm from "./CreateMessageForm";
import MessageList from "./MessageList";

function MessageModal({ data }) {
  const socket = useSocket();

  useEffect(() => {
    socket.current.emit("join_room", data.id);

    return () => {
      socket.current.emit("leave_room", data.id);
    };
  }, []);

  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <img
          className="h-10 w-10 rounded-full"
          src={data.avatar.url}
          alt={data.username}
        />
        <div>
          <div className="font-semibold">{data.username}</div>
          <div className="text-sm text-gray-500">
            {`${data.firstname} ${data.lastname}`}
          </div>
        </div>
      </div>
      <div
        id="messageList"
        className="flex h-80 flex-col-reverse overflow-y-auto rounded-lg bg-yellow-200 p-3"
      >
        <MessageList userId={data.id} />
      </div>
      <CreateMessageForm userId={data.id} />
    </div>
  );
}

export default MessageModal;
