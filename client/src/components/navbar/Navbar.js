import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  BsSearch,
  BsPerson,
  BsChatSquareText,
  BsBoxArrowRight,
  BsLayoutTextWindowReverse,
} from "react-icons/bs";

import { signout } from "../../api/auth";
import useModal from "../../hooks/useModal";
import useAuth from "../../hooks/useAuth";
import Search from "../search/Search";
import handleError from "../../utils/handleError";

function Navbar() {
  const { openModal } = useModal();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { mutate } = useMutation(signout, {
    onError: (error, variables, context) => {
      handleError(error);
    },
  });

  const handleSignout = () => {
    mutate();
  };

  const showSearch = () => {
    openModal(<Search />);
  };

  const navigateToPosts = () => {
    navigate("/posts");
  };

  const navigateToMessages = () => {
    navigate("/messages");
  };

  const navigateToProfile = () => {
    navigate(`/users/${user.uid}`);
  };

  return (
    <nav className="fixed left-0 top-0 z-20 w-full bg-yellow-300">
      <main className="container mx-auto flex items-center gap-3 px-3">
        <h1 className="font-shrikhand text-xl">Vibely</h1>
        <ul className="grid h-12 w-full grid-cols-5 sm:w-80">
          <li
            className="flex cursor-pointer items-center justify-center hover:bg-yellow-400"
            data-tooltip-id="tooltip"
            data-tooltip-content="Posts"
            onClick={navigateToPosts}
          >
            <BsLayoutTextWindowReverse className="shrink-0" size="1.5em" />
          </li>
          <li
            className="flex cursor-pointer items-center justify-center hover:bg-yellow-400"
            data-tooltip-id="tooltip"
            data-tooltip-content="Search"
            onClick={showSearch}
          >
            <BsSearch className="shrink-0" size="1.5em" />
          </li>
          <li
            className="flex cursor-pointer items-center justify-center hover:bg-yellow-400"
            data-tooltip-id="tooltip"
            data-tooltip-content="Messages"
            onClick={navigateToMessages}
          >
            <BsChatSquareText className="shrink-0" size="1.5em" />
          </li>
          <li
            className="flex cursor-pointer items-center justify-center hover:bg-yellow-400"
            data-tooltip-id="tooltip"
            data-tooltip-content="Profile"
            onClick={navigateToProfile}
          >
            <BsPerson className="shrink-0" size="1.5em" />
          </li>
          <li
            className="flex cursor-pointer items-center justify-center hover:bg-yellow-400"
            data-tooltip-id="tooltip"
            data-tooltip-content="Sign out"
            onClick={handleSignout}
          >
            <BsBoxArrowRight className="shrink-0" size="1.5em" />
          </li>
        </ul>
      </main>
    </nav>
  );
}

export default Navbar;
