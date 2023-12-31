import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

function Dropdown({ children }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", handleHideDropdown);

    return () => {
      document.body.removeEventListener("click", handleHideDropdown);
    };
  }, []);

  const handleHideDropdown = () => {
    setIsDropdownVisible(false);
  };

  const handleStopPropagation = (event) => {
    event.stopPropagation();
  };

  const handleToggleDropdown = (event) => {
    handleStopPropagation(event);
    setIsDropdownVisible((state) => !state);
  };

  return (
    <div className="relative">
      <button onClick={handleToggleDropdown}>
        <BsThreeDots size="1.5em" />
      </button>
      {isDropdownVisible ? (
        <div
          className="absolute right-1/2 top-full z-10 w-32 rounded bg-neutral-900 p-2 text-white"
          onClick={handleStopPropagation}
        >
          <div
            className="[&>button:hover]:bg-neutral-950 [&>button]:flex [&>button]:w-full [&>button]:items-center [&>button]:gap-3 [&>button]:rounded [&>button]:p-2 [&>button]:text-sm"
            onClick={handleHideDropdown}
          >
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Dropdown;
