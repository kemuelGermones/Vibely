import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  const handleNavigateToHomepage = () => {
    navigate("/");
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-3">
      <div className="text-center font-shrikhand text-9xl text-gray-700">
        404
      </div>
      <div className="text-center text-xl text-gray-700">Page not found</div>
      <div className="text-center text-gray-500">
        Oops! We couldn't find the page you are looking for.
      </div>
      <button
        className="btn-secondary"
        type="button"
        onClick={handleNavigateToHomepage}
      >
        Go to homepage
      </button>
    </main>
  );
}

export default Error;
