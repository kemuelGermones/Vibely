function DeletePostForm({ id }) {
  return (
    <div className="rounded-lg bg-white p-3 shadow">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 rounded-lg border border-red-500 p-6">
          <img className="mx-auto h-14 w-14" src="./cross-circle.svg" />
          <h1 className="text-center text-xl text-gray-700">Are you sure?</h1>
          <p className="text-center text-gray-500">
            You won't be able to revert this
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button className="w-full rounded-lg bg-gray-500 p-2 font-semibold text-white shadow hover:bg-gray-600 focus:outline-none">
            Cancel
          </button>
          <button className="w-full rounded-lg bg-red-500 p-2 font-semibold text-white shadow hover:bg-red-600 focus:outline-none">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePostForm;
