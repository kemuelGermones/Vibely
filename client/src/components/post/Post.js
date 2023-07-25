import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsHeart, BsChat, BsThreeDotsVertical } from "react-icons/bs";

import Comments from "../comment/Comments";
import { AuthContext } from "../../store/auth-context";
import { ModalContext } from "../../store/modal-context";
import UpdatePostForm from "./UpdatePostForm";
import PostCarousel from "./PostCarousel";

function Post({ data }) {
  const { user } = useContext(AuthContext);
  const { openModal } = useContext(ModalContext);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", closeDropdown);

    return () => {
      document.body.removeEventListener("click", closeDropdown);
    };
  }, []);

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  const toggleDropdown = (event) => {
    stopPropagationHandler(event);
    setIsDropdownVisible((state) => !state);
  };

  const stopPropagationHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0">
            <img
              className="h-full w-full rounded-full object-cover"
              src={data.user.avatar.url}
            />
          </div>
          <div>
            <Link className="font-semibold" to="/users">
              {data.user.username}
            </Link>
            <div className="text-sm text-gray-500">{`${data.user.firstname} ${data.user.lastname}`}</div>
          </div>
        </div>
        {data.user.id === user.uid ? (
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
                      closeDropdown();
                      openModal(
                        <UpdatePostForm id={data.id} caption={data.caption} />
                      );
                    }}
                  >
                    Edit
                  </li>
                  <li
                    className="cursor-pointer rounded px-4 py-2 text-center hover:bg-stone-900"
                    onClick={closeDropdown}
                  >
                    Delete
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <p>{data.caption}</p>
      {data.images.length > 1 ? (
        <PostCarousel images={data.images} />
      ) : (
        <img className="rounded-lg" src={data.images[0].url} />
      )}
      <div className="flex items-center gap-3">
        <BsHeart
          className="shrink-0 cursor-pointer"
          size="1.5em"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Like"
        />
        <div>100</div>
        <BsChat
          className="shrink-0 cursor-pointer"
          size="1.5em"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Comment"
          onClick={() => {
            openModal(<Comments />);
          }}
        />
        <div>{data.comments}</div>
      </div>
    </div>
  );
}

export default Post;
