import { BsExclamationTriangle } from "react-icons/bs";

function PostError() {
  return (
    <div className="rounded-lg bg-white p-3 shadow">
      <div className="flex gap-3">
        <BsExclamationTriangle
          className="w-10 shrink-0 text-red-500"
          size="1.5em"
        />
        <div className="flex flex-col">
          <h1 className="font-semibold">Something went wrong</h1>
          <p>An error occured while trying to fetch posts.</p>
        </div>
      </div>
    </div>
  );
}

export default PostError;
