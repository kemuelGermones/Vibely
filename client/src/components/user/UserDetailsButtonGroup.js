import { BsPersonPlus, BsEnvelope } from "react-icons/bs";

function UserDetailsButtonGroup() {
  const followButton = (
    <button>
      <div data-tooltip-id="tooltip" data-tooltip-content="Follow">
        <BsPersonPlus size="1.5em" />
      </div>
    </button>
  );

  const messageButton = (
    <button>
      <div data-tooltip-id="tooltip" data-tooltip-content="Message">
        <BsEnvelope size="1.5em" />
      </div>
    </button>
  );

  return (
    <div className="flex gap-3">
      {followButton}
      {messageButton}
    </div>
  );
}

export default UserDetailsButtonGroup;
