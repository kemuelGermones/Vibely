import { BsExclamationTriangle } from "react-icons/bs";

import Card from "../ui/Card";

function ErrorPost() {
  return (
    <Card>
      <div className="flex gap-3 [&>*:nth-child(2)]:grow">
        <BsExclamationTriangle
          className="w-10 shrink-0 text-red-500"
          size="1.5em"
        />
        <div className="flex flex-col">
          <h1 className="font-semibold">Something went wrong</h1>
          <p>An error occured while trying to fetch posts.</p>
        </div>
      </div>
    </Card>
  );
}

export default ErrorPost;
