function Bubble() {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="h-6 w-6 animate-[bounce_1s_infinite_-0.3s] rounded-full bg-yellow-400"></div>
      <div className="h-6 w-6 animate-[bounce_1s_infinite_-0.1s] rounded-full bg-yellow-400"></div>
      <div className="h-6 w-6 animate-[bounce_1s_infinite_0.1s] rounded-full bg-yellow-400"></div>
    </div>
  );
}

export default Bubble;
