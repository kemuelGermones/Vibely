import { useState, useEffect, useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { ModalContext } from "../../store/modal-context";
import UpdatePostForm from "./UpdatePostForm";
import DeletePostForm from "./DeletePostForm";

function PostDropdown({ id, caption }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { openModal } = useContext(ModalContext);

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setIsDropdownVisible(false);
    });

    return () => {
      document.body.removeEventListener("click", () => {
        setIsDropdownVisible(false);
      });
    };
  }, []);

  const toggleDropdown = (event) => {
    stopPropagationHandler(event);
    setIsDropdownVisible((state) => !state);
  };

  const stopPropagationHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="relative">
      <BsThreeDotsVertical size="1.5em" onClick={toggleDropdown} />
      {isDropdownVisible ? (
        <div
          className="absolute -left-[70px] top-8 z-10 flex flex-col items-end sm:left-1/2 sm:-translate-x-1/2 sm:items-center"
          onClick={stopPropagationHandler}
        >
          <div className="h-0 w-0 border-b-[8px] border-l-[8px] border-b-stone-900/90 border-l-transparent border-r-transparent sm:border-b-[6px] sm:border-l-[6px] sm:border-r-[6px]" />
          <ul className="rounded-bl rounded-br rounded-tl bg-stone-900/90 p-1 text-sm text-white sm:rounded-tr">
            <li
              className="cursor-pointer rounded px-4 py-2 text-center hover:bg-stone-900"
              onClick={() => {
                openModal(<UpdatePostForm id={id} caption={caption} />);
              }}
            >
              Edit
            </li>
            <li
              className="cursor-pointer rounded px-4 py-2 text-center hover:bg-stone-900"
              onClick={() => {
                openModal(<DeletePostForm id={id} />);
              }}
            >
              Delete
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default PostDropdown;
