import Card from "../ui/Card";
import Input from "../ui/Input";
import Avatar from "../ui/Avatar";

function Search() {
  return (
    <Card>
      <Input type="text" placeholder="Search user" />
      <ul className="h-80 overflow-y-auto">
        <li className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-yellow-400">
          <Avatar src="https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          <div>
            <div className="font-semibold">theAdmiral</div>
            <div className="text-sm text-gray-500">John Doe</div>
          </div>
        </li>
      </ul>
    </Card>
  );
}

export default Search;
