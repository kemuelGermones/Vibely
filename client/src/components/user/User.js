import UserButtonGroup from "./UserButtonGroup";

function User() {
  return (
    <div className="rounded-lg bg-white p-3 shadow">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 ">
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
          <UserButtonGroup />
        </div>
        <div className="flex justify-around">
          <button>100 followers</button>
          <button>100 following</button>
        </div>
      </div>
    </div>
  );
}

export default User;
