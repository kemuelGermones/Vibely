function Fallback() {
  return (
    <main className="flex h-screen items-center justify-center gap-3">
      <div className="h-5 w-5 animate-[bounce_1s_infinite_-0.3s] rounded-full bg-yellow-400"></div>
      <div className="h-5 w-5 animate-[bounce_1s_infinite_-0.1s] rounded-full bg-yellow-400"></div>
      <div className="h-5 w-5 animate-[bounce_1s_infinite_0.1s] rounded-full bg-yellow-400"></div>
    </main>
  );
}

export default Fallback;
