import { BsExclamationTriangle } from "react-icons/bs";

function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-3">
      <BsExclamationTriangle className="text-red-500" size="2.5em" />
      <h1 className="text-center text-xl text-gray-700">Page not found</h1>
      <p className="text-center text-gray-500">
        The page you are looking for is not available.
      </p>
    </main>
  );
}

export default NotFound;
