import { BsHeart, BsTrash } from "react-icons/bs";

import CreateCommentForm from "./CreateCommentForm";

function Comments({ id }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow">
      <CreateCommentForm id={id} />
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
