function UpdateUserPassword() {
  return (
    <div className="rounded-lg bg-white p-3 shadow">
      <form className="flex flex-col gap-3">
        <input
          className={`w-full rounded-lg p-3 shadow ${
            false
              ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_center] bg-no-repeat focus:border-red-500 focus:ring-red-500"
              : "border-yellow-300 focus:border-yellow-300 focus:ring-yellow-300"
          }`}
          type="password"
          placeholder="Enter password"
        />
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

export default UpdateUserPassword;
