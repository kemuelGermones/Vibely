import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import { getComments } from "../../api/comment";
import Comment from "./Comment";

function CommentList({ postId }) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["posts", postId, "comments"],
      queryFn: ({ pageParam = 0 }) => getComments({ postId, pageParam }),
      getNextPageParam: (lastPage, allPages) => {
        const response = lastPage.data;
        const comments = response.items;
        return comments.length ? allPages.length : undefined;
      },
    });

  const comments = useMemo(() => {
    let result = [];
    if (data) {
      data.pages.forEach((page) => {
        result = result.concat(page.data.items);
      });
    }
    return result;
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-yellow-400 border-t-transparent"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full w-full flex-col justify-center gap-3">
        <img className="mx-auto h-14 w-14" src="./warning.svg" />
        <h1 className="text-center text-xl text-gray-700">
          Failed to fetch comments
        </h1>
        <p className="text-center text-gray-500">
          There was an error fetching the data
        </p>
      </div>
    );
  }

  return (
    <InfiniteScroll
      className="flex flex-col gap-3"
      scrollableTarget="comments"
      style={{ overflow: "visible" }}
      loader={
        <div className="flex justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-yellow-400 border-t-transparent"></div>
        </div>
      }
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