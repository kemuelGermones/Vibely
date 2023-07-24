function Chat() {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow">
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
      <ul className="flex h-80 flex-col gap-3 overflow-y-auto rounded-lg bg-yellow-200 p-3">
        <li className="w-3/4 rounded-lg bg-yellow-300 p-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </li>
        <li className="ml-auto mr-0 w-3/4 rounded-lg bg-yellow-300 p-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </li>
      </ul>
      <form className="flex flex-col gap-3">
        <textarea
          className="h-24 w-full resize-none rounded-lg border-yellow-300 p-3 shadow focus:border-yellow-300 focus:ring-yellow-300"
          placeholder="Message"
        />
        <button className="w-full rounded-lg bg-yellow-300 p-3 font-semibold shadow hover:bg-yellow-400 focus:outline-none">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
