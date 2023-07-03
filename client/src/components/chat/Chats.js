import { useContext } from "react";

import Chat from "./Chat";
import { ModalContext } from "../../store/modal-context";

function Chats() {
  const { openModal } = useContext(ModalContext);

  return (
    <div className="flex h-full flex-col gap-3 rounded-lg bg-white p-3 shadow">
      <h1>Chats</h1>
      <ul className="h-full overflow-y-auto">
        <li
          className="cursor-pointer rounded-lg p-3 hover:bg-yellow-300"
          onClick={() => {
            openModal(<Chat />);
          }}
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0">
              <img
                className="h-full w-full rounded-full object-cover"
                src="https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
            </div>
            <div>
              <div className="font-semibold">theAdmiral</div>
              <div className="text-sm text-gray-500">John Doe</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Chats;
