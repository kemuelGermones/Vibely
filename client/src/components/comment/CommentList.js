import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BsExclamationTriangle } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";

import { getComments } from "../../api/comment";
import Comment from "./Comment";

function Loader() {
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

function Error() {
  return (
    <div className="flex items-center gap-3 [&>*:nth-child(2)]:grow">
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
  );
}

function CommentList({ postId }) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["posts", postId, "comments"],
      queryFn: ({ pageParam = 0 }) => getComments({ postId, page: pageParam }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
    });

  const comments = useMemo(() => {
    let result = [];
    if (data) {
      data.pages.forEach((page) => {
        result = result.concat(page);
      });
    }
    return result;
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <InfiniteScroll
      className="flex flex-col gap-3"
      scrollableTarget="commentList"
      style={{ overflow: "visible" }}
      loader={<Loader />}
      dataLength={comments.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
    >
      {comments.map((comment) => (
        <Comment postId={postId} data={comment} key={comment.id} />
      ))}
    </InfiniteScroll>
  );
}

export default CommentList;
