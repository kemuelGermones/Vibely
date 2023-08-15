import Card from "../ui/Card";
import Input from "../ui/Input";
import Avatar from "../ui/Avatar";
import Header from "../ui/Header";

function Search() {
  return (
    <Card>
      <Input type="text" placeholder="Search user" />
      <ul className="h-80 overflow-y-auto">
        <li className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-yellow-300">
          <Avatar src="https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          <Header username="theAdmiral" fullname="John Doe" />
        </li>
      </ul>
    </Card>
  );
}

export default Search;
