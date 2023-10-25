import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function Carousel({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePreviousSlide = () => {
    setCurrentSlide((state) => (state === 0 ? images.length - 1 : state - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((state) => (state === images.length - 1 ? 0 : state + 1));
  };

  if (images.length > 1) {
    return (
      <div className="relative overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image) => (
            <img
              className="min-w-0 flex-[0_0_100%]"
              src={image.url}
              alt={image.filename}
              key={image.id}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handlePreviousSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 text-gray-800 shadow hover:bg-white"
        >
          <BsChevronLeft />
        </button>
        <button
          type="button"
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 text-gray-800 shadow hover:bg-white"
        >
          <BsChevronRight />
        </button>
        <div className="absolute bottom-4 left-1/2 flex w-min -translate-x-1/2 items-center gap-2">
          {images.map((image, index) => (
            <div
              className={`
              h-3 w-3 rounded-full bg-white transition-all
              ${currentSlide === index ? "p-2" : "bg-opacity-50"}
            `}
              key={image.id}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <img className="rounded-lg" src={images[0].url} alt={images[0].filename} />
  );
}

export default Carousel;
