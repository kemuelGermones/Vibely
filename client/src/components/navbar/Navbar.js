import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  BsSearch,
  BsPerson,
  BsChatSquareText,
  BsBoxArrowRight,
  BsLayoutTextWindowReverse,
} from "react-icons/bs";

import { ModalContext } from "../../store/modal-context";
import Search from "../search/Search";

function Navbar() {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();

  return (
    <nav className="fixed left-0 top-0 z-10 w-full bg-yellow-300">
      <main className="container mx-auto flex items-center gap-3 px-3">
        <div className="text-lg font-bold">Vibely</div>
        <ul className="grid h-12 w-full grid-cols-5 sm:w-80">
          <li
            className="flex cursor-pointer items-center justify-center hover:bg-yellow-400"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Posts"
            onClick={() => {
              navigate("/posts");
            }}
          >
            <BsLayoutTextWindowReverse className="shrink-0" size="1.5em" />
          </li>
          <li
            className="flex cursor-pointer items-center justify-center hover:bg-yellow-400"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Search"
            onClick={() => {
              openModal(<Search />);
            }}
          >
            <BsSearch className="shrink-0" size="1.5em" />
          </li>
          <li
            className="flex cursor-pointer items-center justify-center hover:bg-yellow-400"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Messages"
            onClick={() => {
              navigate("/messages");
            }}
          >
            <BsChatSquareText className="shrink-0" size="1.5em" />
          </li>
          <li
            className="flex cursor-pointer items-center justify-center hover:bg-yellow-400"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Profile"
            onClick={() => {
              navigate("/users");
            }}
          >
            <BsPerson className="shrink-0" size="1.5em" />
          </li>
          <li
            className="flex cursor-pointer items-center justify-center hover:bg-yellow-400"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Log out"
          >
            <BsBoxArrowRight className="shrink-0" size="1.5em" />
          </li>
        </ul>
      </main>
    </nav>
  );
}

export default Navbar;
