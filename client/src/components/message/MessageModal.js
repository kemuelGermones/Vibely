import Avatar from "../ui/Avatar";

function MessageModal() {
  return (
    <div className="card flex flex-col gap-3">
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
      <ul className="flex h-80 flex-col gap-3 overflow-y-auto rounded-lg bg-yellow-200 p-3">
        <li className="w-3/4 rounded-lg bg-yellow-400 p-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </li>
        <li className="ml-auto mr-0 w-3/4 rounded-lg bg-yellow-400 p-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </li>
      </ul>
      <form className="flex flex-col gap-3">
        <textarea className="textarea-primary" placeholder="Enter message" />
        <button className="btn-primary" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default MessageModal;
