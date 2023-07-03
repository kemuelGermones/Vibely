import { BsHeart, BsTrash } from "react-icons/bs";

function Comments() {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow">
      <div className="flex gap-3">
        <div className="h-12 w-12 shrink-0">
          <img
            className="h-full w-full rounded-full object-cover"
            src="https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </div>
        <form className="flex w-full flex-col gap-3">
          <textarea
            className="w-full resize-none rounded-lg border-yellow-300 p-3 shadow focus:border-yellow-300 focus:ring-yellow-300"
            placeholder="Add comment"
          />
          <button className="w-full rounded-lg bg-yellow-300 p-3 font-semibold shadow hover:bg-yellow-400 focus:outline-none">
            Comment
          </button>
        </form>
      </div>
      <ul className="flex h-80 flex-col gap-3 overflow-y-auto">
        <li className="flex gap-3">
          <div className="h-12 w-12 shrink-0">
            <img
              className="h-full w-full rounded-full object-cover"
              src="https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </div>
          <div>
            <p className="mb-3">
              <span className="font-semibold">theAdmiral</span> Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </p>
            <div className="flex gap-3">
              <BsHeart />
              <BsTrash />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Comments;
