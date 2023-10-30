import { useMutation } from "@tanstack/react-query";
import { Fragment } from "react";
import {
  BsBoxArrowRight,
  BsCardText,
  BsEnvelope,
  BsPerson,
  BsSearch,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { signout } from "../../apis/client";
import useAuth from "../../hooks/useAuth";
import useModal from "../../hooks/useModal";
import SearchModal from "../search/SearchModal";

function Navbar() {
  const { showModal } = useModal();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { mutate } = useMutation(signout, {
    onError: (error) => {
      toast.error(error.message, { theme: "colored" });
    },
  });

  const handleSignout = () => {
    mutate();
  };

  const handleShowSearchModal = () => {
    showModal(<SearchModal />);
  };

  const handleNavigateToPosts = () => {
    navigate("/posts");
  };

  const handleNavigateToInbox = () => {
    navigate("/inbox");
  };

  const handleNavigateToProfile = () => {
    navigate(`/users/${user.uid}`);
  };

  return (
    <Fragment>
      <nav className="fixed left-0 top-0 z-20 w-full bg-yellow-400">
        <main className="container mx-auto flex items-center gap-3 px-3">
          <div className="font-shrikhand text-xl">Vibely</div>
          <div className="grid h-12 w-full grid-cols-5 sm:w-80">
            <div
              className="flex cursor-pointer items-center justify-center hover:bg-yellow-500"
              data-tooltip-id="navbar"
              data-tooltip-content="Search"
              onClick={handleShowSearchModal}
            >
              <BsSearch className="shrink-0" size="1.5em" />
            </div>
            <div
              className="flex cursor-pointer items-center justify-center hover:bg-yellow-500"
              data-tooltip-id="navbar"
              data-tooltip-content="Posts"
              onClick={handleNavigateToPosts}
            >
              <BsCardText className="shrink-0" size="1.5em" />
            </div>
            <div
              className="flex cursor-pointer items-center justify-center hover:bg-yellow-500"
              data-tooltip-id="navbar"
              data-tooltip-content="Inbox"
              onClick={handleNavigateToInbox}
            >
              <BsEnvelope className="shrink-0" size="1.5em" />
            </div>
            <div
              className="flex cursor-pointer items-center justify-center hover:bg-yellow-500"
              data-tooltip-id="navbar"
              data-tooltip-content="Profile"
              onClick={handleNavigateToProfile}
            >
              <BsPerson className="shrink-0" size="1.5em" />
            </div>
            <div
              className="flex cursor-pointer items-center justify-center hover:bg-yellow-500"
              data-tooltip-id="navbar"
              data-tooltip-content="Sign out"
              onClick={handleSignout}
            >
              <BsBoxArrowRight className="shrink-0" size="1.5em" />
            </div>
          </div>
        </main>
      </nav>
      <Tooltip id="navbar" place="bottom" />
    </Fragment>
  );
}

export default Navbar;
