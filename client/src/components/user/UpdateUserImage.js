function UpdateUserImage() {
  return (
    <div className="rounded-lg bg-white p-3 shadow">
      <form className="flex flex-col gap-3">
        <label
          className={`relative block flex w-full cursor-pointer flex-col gap-3 rounded-lg border p-6 shadow ${
            false
              ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_top_0.5rem] bg-no-repeat"
              : "border-yellow-300"
          }`}
          htmlFor="image"
        >
          <div className="mx-auto h-36 w-36 shrink-0">
            <img
              className="h-full w-full rounded-full bg-yellow-100 object-cover"
              src={false ? "..." : "./person.svg"}
            />
          </div>
          <h2 className="text-center text-xl text-gray-700">
            Change profile picture
          </h2>
          <p className="text-center text-gray-500">
            Upload or drag & drop your file PNG, JPG or JPEG
          </p>
          <input className="absolute -z-10 opacity-0" type="file" />
        </label>
        <button
          className="block w-full rounded-lg bg-yellow-300 p-3 font-semibold shadow shadow hover:bg-yellow-400 focus:outline-none"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default UpdateUserImage;
