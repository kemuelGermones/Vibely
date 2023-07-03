import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BsPersonPlus,
  BsHeart,
  BsChat,
  BsChevronLeft,
  BsChevronRight,
  BsThreeDotsVertical,
} from "react-icons/bs";

import Comments from "../comment/Comments";
import { ModalContext } from "../../store/modal-context";
import UpdatePost from "./UpdatePost";

const IMAGES = [
  "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

function Post() {
  const { openModal } = useContext(ModalContext);
  const [currentSlide, setCurrentSlide] = useState(0);
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

  const previousSlide = () => {
    setCurrentSlide((current) =>
      current === 0 ? IMAGES.length - 1 : current - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((current) =>
      current === IMAGES.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0">
            <img
              className="h-full w-full rounded-full object-cover"
              src="https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </div>
          <div>
            <Link className="font-semibold" to="/users">
              theAdmiral
            </Link>
            <div className="text-sm text-gray-500">John Doe</div>
          </div>
        </div>
        <div className="relative">
          <BsThreeDotsVertical size="1.5em" onClick={toggleDropdown} />
          {isDropdownVisible ? (
            <div
              className="absolute -left-[70px] top-8 flex flex-col items-end sm:left-1/2 sm:-translate-x-1/2 sm:items-center"
              onClick={stopPropagationHandler}
            >
              <div className="h-0 w-0 border-b-[8px] border-l-[8px] border-b-stone-900/90 border-l-transparent border-r-transparent sm:border-b-[6px] sm:border-l-[6px] sm:border-r-[6px]" />
              <ul className="rounded-bl rounded-br rounded-tl bg-stone-900/90 p-1 text-sm text-white sm:rounded-tr">
                <li
                  className="cursor-pointer rounded px-4 py-2 text-center hover:bg-stone-900"
                  onClick={() => {
                    closeDropdown();
                    openModal(<UpdatePost />);
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
        {/* <BsPersonPlus
          className="shrink-0 cursor-pointer"
          size="1.5em"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Follow"
        /> */}
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <div className="relative overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {IMAGES.map((image) => (
            <img className="min-w-0 flex-[0_0_100%]" src={image} />
          ))}
        </div>
        <button
          type="button"
          onClick={previousSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 text-gray-800 shadow hover:bg-white"
        >
          <BsChevronLeft />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 text-gray-800 shadow hover:bg-white"
        >
          <BsChevronRight />
        </button>
        <div className="absolute bottom-4 left-1/2 flex w-min -translate-x-1/2 items-center gap-2">
          {IMAGES.map((image, index) => (
            <div
              className={`
              h-3 w-3 rounded-full bg-white transition-all
              ${currentSlide === index ? "p-2" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
      {/* <img src={IMAGES[0]} alt="food" className="rounded-lg" /> */}
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
        <div>100</div>
      </div>
    </div>
  );
}

export default Post;
