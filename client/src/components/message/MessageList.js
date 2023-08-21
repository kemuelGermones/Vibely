import useModal from "../../hooks/useModal";
import MessageModal from "./MessageModal";
import Avatar from "../ui/Avatar";

function MessageList() {
  const { openModal } = useModal();

  return (
    <div className="card flex flex-col gap-3">
      <div>Messages</div>
      <ul className="h-[calc(100vh-8.3rem)] overflow-y-auto">
        <li
          className="cursor-pointer rounded-lg p-3 hover:bg-yellow-400"
          onClick={() => {
            openModal(<MessageModal />);
          }}
        >
          <div className="flex items-center gap-3">
            <Avatar
              src="https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="theAdmiral"
            />
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

export default MessageList;
