function LoadComment() {
  return (
    <div className="flex gap-3 [&>*:nth-child(2)]:grow">
      <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-300" />
      <div className="flex flex-col gap-1">
        <div className="h-3.5 w-1/4 animate-pulse rounded-full bg-gray-300" />
        <div className="h-3.5 animate-pulse rounded-full bg-gray-300" />
        <div className="h-3.5 animate-pulse rounded-full bg-gray-300" />
        <div className="h-3.5 w-2/6 animate-pulse rounded-full bg-gray-300" />
      </div>
    </div>
  );
}

export default LoadComment;