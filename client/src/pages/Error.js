import Navbar from "../components/navbar/Navbar";

function Error() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto mt-12 h-[calc(100vh-3rem)] p-3">
        <img
          className="h-full w-full object-contain"
          src="./404.svg"
          alt="Page not found"
        />
      </main>
    </>
  );
}

export default Error;
