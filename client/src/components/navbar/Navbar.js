import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  BsSearch,
  BsPerson,
  BsChatSquareText,
  BsBoxArrowRight,
  BsLayoutTextWindowReverse,
} from "react-icons/bs";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

import { ModalContext } from "../../store/modal-context";
import { auth } from "../../config/firebase";
import Search from "../search/Search";
import firebaseError from "../../utils/firebaseError";

function Navbar() {
  const { openModal } = useContext(ModalContext);

  const mutation = useMutation(() => signOut(auth), {
    onError: (error, variables, context) => {
      const message = firebaseError(error);
      toast.error(message);
    },
  });

  const navigate = useNavigate();

  return (
    <nav className="fixed left-0 top-0 z-20 w-full bg-yellow-300">
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
            data-tooltip-content="Sign out"
            onClick={() => {
              mutation.mutate();
            }}
          >
            <BsBoxArrowRight className="shrink-0" size="1.5em" />
          </li>
        </ul>
      </main>
    </nav>
  );
}

export default Navbar;
