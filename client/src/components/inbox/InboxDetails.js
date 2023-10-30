import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import useSocket from "../../hooks/useSocket";
import ContactList from "./ContactList";

function InboxDetails() {
  const queryClient = useQueryClient();
  const socket = useSocket();

  useEffect(() => {
    socket.current.on("invalidate_contacts", handleInvalidateContacts);

    return () => {
      socket.current.off("invalidate_contacts", handleInvalidateContacts);
    };
  }, []);

  const handleInvalidateContacts = () => {
    queryClient.invalidateQueries({ queryKey: ["contacts"] });
  };

  return (
    <div className="card flex flex-col gap-3">
      <div className="text-sm text-gray-500">Inbox</div>
      <div id="contactList" className="h-[calc(100vh-8.3rem)] overflow-y-auto">
        <ContactList />
      </div>
    </div>
  );
}

export default InboxDetails;
