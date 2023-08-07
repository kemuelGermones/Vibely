import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  const handleHomepage = () => {
    navigate("/");
  };

  return (
    <main className="gap-63 flex h-screen flex-col items-center justify-center gap-3">
      <h1 className="text-9xl font-semibold text-gray-700">404</h1>
      <h2 className="text-center text-xl text-gray-700">Page not found</h2>
      <p className="text-center text-gray-500">
        Oops! We couldn't find the page you are looking for.
      </p>
      <button
        className="rounded-lg bg-gray-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-gray-600 focus:outline-none"
        type="button"
        onClick={handleHomepage}
      >
        Go to homepage
      </button>
    </main>
  );
}

export default Error;
