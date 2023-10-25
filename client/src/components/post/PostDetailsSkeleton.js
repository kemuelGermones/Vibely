function PostDetailsSkeleton() {
  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-300" />
        <div className="flex w-full flex-col gap-1">
          <div className="h-3.5 max-w-[96px] animate-pulse rounded-full bg-gray-300" />
          <div className="h-3.5 max-w-[144px] animate-pulse rounded-full bg-gray-300" />
        </div>
      </div>
      <div className="flex w-full flex-col gap-1">
        <div className="h-3.5 animate-pulse rounded-full bg-gray-300" />
        <div className="h-3.5 animate-pulse rounded-full bg-gray-300" />
        <div className="h-3.5 animate-pulse rounded-full bg-gray-300" />
        <div className="h-3.5 animate-pulse rounded-full bg-gray-300" />
        <div className="h-3.5 max-w-[144px] animate-pulse rounded-full bg-gray-300" />
      </div>
      <div className="aspect-video w-full animate-pulse rounded-lg bg-gray-300" />
      <div className="flex gap-3">
        <div className="h-3.5 w-24 animate-pulse rounded-full bg-gray-300" />
        <div className="h-3.5 w-24 animate-pulse rounded-full bg-gray-300" />
      </div>
    </div>
  );
}

export default PostDetailsSkeleton;
