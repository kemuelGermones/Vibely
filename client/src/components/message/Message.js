import Card from "../ui/Card";
import Avatar from "../ui/Avatar";
import Header from "../ui/Header";
import Form from "../ui/Form";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

function Message() {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <Avatar src="https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        <Header username="theAdmiral" fullname="John Doe" />
      </div>
      <ul className="flex h-80 flex-col gap-3 overflow-y-auto rounded-lg bg-yellow-200 p-3">
        <li className="w-3/4 rounded-lg bg-yellow-300 p-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </li>
        <li className="ml-auto mr-0 w-3/4 rounded-lg bg-yellow-300 p-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </li>
      </ul>
      <Form>
        <Textarea placeholder="Message" />
        <Button type="submit">Send</Button>
      </Form>
    </Card>
  );
}

export default Message;
