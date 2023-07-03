import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const IMAGES = [
  "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

function UpdatePost() {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    <div className="rounded-lg bg-white p-3 shadow">
      <form className="flex flex-col gap-3">
        <textarea
          className="w-full resize-none rounded-lg border-yellow-300 p-3 shadow focus:border-yellow-300 focus:ring-yellow-300"
          placeholder="Description"
        />
        <div className="relative overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {IMAGES.map((image) => (
              <div className="relative min-w-0 flex-[0_0_100%]">
                <img src={image} />
                <input
                  className="absolute right-4 top-4 rounded-full border-0 bg-white/80 p-3 text-red-500 checked:bg-[url('../public/cross.svg')] hover:bg-white focus:ring-0 focus:ring-offset-0"
                  type="checkbox"
                  value={image}
                />
              </div>
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
        <button className="w-full rounded-lg bg-yellow-300 p-3 font-semibold shadow hover:bg-yellow-400 focus:outline-none">
          Save
        </button>
      </form>
    </div>
  );
}

export default UpdatePost;
