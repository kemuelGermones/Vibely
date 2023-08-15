import useModal from "../../hooks/useModal";
import Card from "../ui/Card";
import Message from "./Message";
import Avatar from "../ui/Avatar";
import Header from "../ui/Header";

function ListMessage() {
  const { openModal } = useModal();

  return (
    <Card>
      <h1>Messages</h1>
      <ul className="h-[calc(100vh-8.3rem)] overflow-y-auto">
        <li
          className="cursor-pointer rounded-lg p-3 hover:bg-yellow-300"
          onClick={() => {
            openModal(<Message />);
          }}
        >
          <div className="flex items-center gap-3">
            <Avatar src="https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <Header username="theAdmiral" fullname="John Doe" />
          </div>
        </li>
      </ul>
    </Card>
  );
}

export default ListMessage;
