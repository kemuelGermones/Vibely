import { useInfiniteQuery } from "@tanstack/react-query";
import { BsExclamationTriangle } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";

import { getPosts } from "../../apis/post";
import usePages from "../../hooks/usePages";
import PostDetails from "./PostDetails";

function Loader() {
  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-300" />
        <div className="flex w-full flex-col gap-1">
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
  );
}

function Error() {
  return (
    <div className="card">
      <div className="flex items-center gap-3">
        <BsExclamationTriangle
          className="w-10 shrink-0 text-red-500"
          size="1.5em"
        />
        <div className="flex flex-col">
          <div className="font-semibold">Something went wrong</div>
          <div className="text-sm text-gray-500">
            An error occured while trying to fetch posts.
          </div>
        </div>
      </div>
    </div>
  );
}

function PostList({ userId }) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: userId ? ["posts", { search: userId }] : ["posts"],
      queryFn: ({ pageParam = 0 }) =>
        getPosts({ page: pageParam, search: userId }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
    });

  const posts = usePages(data);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <InfiniteScroll
      className="flex flex-col gap-3"
      style={{ overflow: "visible" }}
      loader={<Loader />}
      dataLength={posts.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
    >
      {posts.map((post) => (
        <PostDetails data={post} key={post.id} />
      ))}
    </InfiniteScroll>
  );
}

export default PostList;
