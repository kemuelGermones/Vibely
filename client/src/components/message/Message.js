import Card from "../ui/Card";
import Avatar from "../ui/Avatar";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

function Message() {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <Avatar src="https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
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
        <Textarea placeholder="Message" />
        <Button type="submit">Send</Button>
      </form>
    </Card>
  );
}

export default Message;
