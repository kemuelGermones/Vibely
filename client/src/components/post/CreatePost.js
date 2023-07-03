function CreatePost() {
  return (
    <div className="rounded-lg bg-white p-3 shadow">
      <form className="flex flex-col gap-3">
        <textarea
          className="w-full resize-none rounded-lg border-yellow-300 p-3 shadow focus:border-yellow-300 focus:ring-yellow-300"
          placeholder="Description"
        />
        <label
          className={`relative block flex w-full cursor-pointer flex-col gap-3 rounded-lg border p-6 shadow ${
            false
              ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_top_0.5rem] bg-no-repeat"
              : "border-yellow-300"
          }`}
          htmlFor="image"
        >
          <svg
            className="mx-auto h-20 w-20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                stroke="#fde047"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          <h1 className="text-center text-xl text-gray-700">Choose images</h1>
          <p className="text-center text-gray-500">
            Upload or drag & drop your file PNG, JPG or JPEG
          </p>
          <input
            className="absolute -z-10 opacity-0"
            id="image"
            name="image"
            type="file"
          />
        </label>
        <button className="w-full rounded-lg bg-yellow-300 p-3 font-semibold shadow hover:bg-yellow-400 focus:outline-none">
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
