import { BsPersonPlus, BsEnvelopePlus } from "react-icons/bs";

import IconButton from "../ui/IconButton";

function UserButtons({ data }) {
  const followButton = (
    <IconButton content="Follow">
      <BsPersonPlus size="1.5em" />
    </IconButton>
  );

  const messageButton = (
    <IconButton content="Message">
      <BsEnvelopePlus size="1.5em" />
    </IconButton>
  );

  return (
    <div className="flex gap-3">
      {followButton}
      {messageButton}
    </div>
  );
}

export default UserButtons;
