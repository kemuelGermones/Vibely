function Search() {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow">
      <input
        className="w-full rounded-lg border-yellow-300 bg-[url('../public/search.svg')] bg-[length:1.7rem] bg-[right_0.5rem_center] bg-no-repeat p-3 shadow focus:border-yellow-300 focus:ring-yellow-300"
        type="text"
        placeholder="Search"
      />
      <ul className="h-80 overflow-y-auto">
        <li className="cursor-pointer rounded-lg p-3 hover:bg-yellow-300">
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
        </li>
      </ul>
    </div>
  );
}

export default Search;
