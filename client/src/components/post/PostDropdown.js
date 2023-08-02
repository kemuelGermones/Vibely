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
    handleStopPropagation(event);
    setIsDropdownVisible((state) => !state);
  };

  const handleStopPropagation = (event) => {
    event.stopPropagation();
  };

  const showUpdatePostForm = () => {
    openModal(<UpdatePostForm id={id} caption={caption} />);
  };

  const showDeletePostForm = () => {
    openModal(<DeletePostForm id={id} />);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown}>
        <BsThreeDotsVertical size="1.5em" />
      </button>
      {isDropdownVisible ? (
        <div
          className="absolute -left-[67px] z-10 w-20 sm:left-1/2 sm:-translate-x-1/2"
          onClick={handleStopPropagation}
        >
          <div className="ml-auto h-0 w-0 border-b-[8px] border-l-[8px] border-b-stone-900/90 border-l-transparent border-r-transparent sm:mx-auto sm:border-b-[6px] sm:border-l-[6px] sm:border-r-[6px]" />
          <div className="rounded-bl rounded-br rounded-tl bg-stone-900/90 p-1 text-sm text-white sm:rounded-tr">
            <button
              className="w-full rounded py-2 hover:bg-stone-900"
              onClick={showUpdatePostForm}
            >
              Edit
            </button>
            <button
              className="w-full rounded py-2 hover:bg-stone-900"
              onClick={showDeletePostForm}
            >
              Delete
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PostDropdown;
