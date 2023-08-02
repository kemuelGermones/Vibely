import { useContext } from "react";
import { Link } from "react-router-dom";
import { BsPersonPlus, BsEnvelope } from "react-icons/bs";

import Chat from "../chat/Chat";
import { ModalContext } from "../../store/modal-context";
import UserList from "./UserList";

function User() {
  const { openModal } = useContext(ModalContext);

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 ">
            <img
              className="h-full w-full rounded-full object-cover"
              src="https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </div>
          <div>
            <Link className="font-semibold" to="/users">
              theAdmiral
            </Link>
            <div className="text-sm text-gray-500">John Doe</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <BsPersonPlus
            className="shrink-0 cursor-pointer"
            size="1.5em"
            data-tooltip-id="tooltip"
            data-tooltip-content="Follow"
          />
          <BsEnvelope
            className="shrink-0 cursor-pointer"
            size="1.5em"
            data-tooltip-id="tooltip"
            data-tooltip-content="Message"
            onClick={() => {
              openModal(<Chat />);
            }}
          />
        </div>
      </div>
      <div className="flex justify-around">
        <div
          className="cursor-pointer"
          onClick={() => {
            openModal(<UserList />);
          }}
        >
          <span className="font-semibold">100</span> followers
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            openModal(<UserList />);
          }}
        >
          <span className="font-semibold">100</span> followers
        </div>
      </div>
    </div>
  );
}

export default User;
