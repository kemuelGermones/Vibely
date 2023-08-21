import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Tooltip } from "react-tooltip";
import {
  BsSearch,
  BsPerson,
  BsBoxArrowRight,
  BsCardText,
  BsEnvelope,
} from "react-icons/bs";
import "react-tooltip/dist/react-tooltip.css";

import { signout } from "../../apis/auth";
import useModal from "../../hooks/useModal";
import useAuth from "../../hooks/useAuth";
import SearchModal from "../search/SearchModal";
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
    openModal(<SearchModal />);
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
    <Fragment>
      <nav className="fixed left-0 top-0 z-20 w-full bg-yellow-400">
        <main className="container mx-auto flex items-center gap-3 px-3">
          <div className="font-shrikhand text-xl">Vibely</div>
          <ul className="grid h-12 w-full grid-cols-5 sm:w-80">
            <li
              className="flex cursor-pointer items-center justify-center hover:bg-yellow-500"
              data-tooltip-id="navbar"
              data-tooltip-content="Search"
              onClick={showSearch}
            >
              <BsSearch className="shrink-0" size="1.5em" />
            </li>
            <li
              className="flex cursor-pointer items-center justify-center hover:bg-yellow-500"
              data-tooltip-id="navbar"
              data-tooltip-content="Posts"
              onClick={navigateToPosts}
            >
              <BsCardText className="shrink-0" size="1.5em" />
            </li>
            <li
              className="flex cursor-pointer items-center justify-center hover:bg-yellow-500"
              data-tooltip-id="navbar"
              data-tooltip-content="Messages"
              onClick={navigateToMessages}
            >
              <BsEnvelope className="shrink-0" size="1.5em" />
            </li>
            <li
              className="flex cursor-pointer items-center justify-center hover:bg-yellow-500"
              data-tooltip-id="navbar"
              data-tooltip-content="Profile"
              onClick={navigateToProfile}
            >
              <BsPerson className="shrink-0" size="1.5em" />
            </li>
            <li
              className="flex cursor-pointer items-center justify-center hover:bg-yellow-500"
              data-tooltip-id="navbar"
              data-tooltip-content="Sign out"
              onClick={handleSignout}
            >
              <BsBoxArrowRight className="shrink-0" size="1.5em" />
            </li>
          </ul>
        </main>
      </nav>
      <Tooltip id="navbar" place="bottom" />
    </Fragment>
  );
}

export default Navbar;
