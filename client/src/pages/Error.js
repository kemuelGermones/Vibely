import { useNavigate } from "react-router-dom";

import Button from "../components/ui/Button";

function Error() {
  const navigate = useNavigate();

  const handleHomepage = () => {
    navigate("/");
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-3">
      <h1 className="text-center font-shrikhand text-9xl text-gray-700">404</h1>
      <h2 className="text-center text-xl text-gray-700">Page not found</h2>
      <p className="text-center text-gray-500">
        Oops! We couldn't find the page you are looking for.
      </p>
      <Button theme="secondary" type="button" onClick={handleHomepage}>
        Go to homepage
      </Button>
    </main>
  );
}

export default Error;
