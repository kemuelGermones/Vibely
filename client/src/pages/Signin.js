import SigninUser from "../components/user/SigninUser";

function Signin() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-yellow-300 to-yellow-600">
      <section className="flex max-w-screen-sm flex-col gap-3 p-3">
        <h1 className="text-center text-6xl font-semibold">Vibely</h1>
        <p className="text-center text-2xl text-yellow-600">
          Positive, Uplifting, Community-focused.
        </p>
        <SigninUser />
      </section>
    </main>
  );
}

export default Signin;