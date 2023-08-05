function PostSkeleton() {
  return (
    <div className="rounded-lg bg-white p-3 shadow">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-300" />
          <div className="flex flex-col gap-1 w-full">
            <div className="h-3.5 w-1/4 animate-pulse rounded-full bg-gray-300" />
            <div className="h-3.5 w-2/6 animate-pulse rounded-full bg-gray-300" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-3.5 w-full animate-pulse rounded-full bg-gray-300" />
          <div className="h-3.5 w-full animate-pulse rounded-full bg-gray-300" />
          <div className="h-3.5 w-full animate-pulse rounded-full bg-gray-300" />
          <div className="h-3.5 w-full animate-pulse rounded-full bg-gray-300" />
          <div className="h-3.5 w-1/4 animate-pulse rounded-full bg-gray-300" />
        </div>
        <div className="aspect-video w-full animate-pulse rounded-lg bg-gray-300" />
        <div className="flex gap-3">
          <div className="h-3.5 w-1/4 animate-pulse rounded-full bg-gray-300" />
          <div className="h-3.5 w-1/4 animate-pulse rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
}

export default PostSkeleton;
