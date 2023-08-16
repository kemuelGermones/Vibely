import { BsPersonPlus, BsEnvelopePlus } from "react-icons/bs";

import IconButton from "../ui/IconButton";

function UserIcons() {
  return (
    <div className="flex gap-3">
      <IconButton content="Follow">
        <BsPersonPlus size="1.5em" />
      </IconButton>
      <IconButton content="Message">
        <BsEnvelopePlus size="1.5em" />
      </IconButton>
    </div>
  );
}

export default UserIcons;
