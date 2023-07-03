import { BsPersonPlus } from "react-icons/bs";

function UserList() {
  // conditional height of ul
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow">
      <h1>Suggestions for you</h1>
      <ul>
        <li className="p-3">
          <div className="flex items-center justify-between">
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
            <BsPersonPlus
              className="shrink-0 cursor-pointer"
              size="1.5em"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Follow"
            />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default UserList;
