import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import { getComments } from "../../api/comment";
import Comment from "./Comment";
import CommentSkeleton from "./CommentSkeleton";
import handleError from "../../utils/handleError";

function CommentList({ postId }) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["posts", postId, "comments"],
      queryFn: ({ pageParam = 0 }) => getComments({ postId, pageParam }),
      getNextPageParam: (lastPage, allPages) => {
        const comments = lastPage.items;
        return comments.length ? allPages.length : undefined;
      },
      onError: (error) => handleError(error),
    });

  const comments = useMemo(() => {
    let result = [];
    if (data) {
      data.pages.forEach((page) => {
        result = result.concat(page.items);
      });
    }
    return result;
  }, [data]);

  if (isLoading || isError) {
    return <CommentSkeleton />;
  }

  return (
    <InfiniteScroll
      className="flex flex-col gap-3"
      scrollableTarget="comments"
      style={{ overflow: "visible" }}
      loader={<CommentSkeleton />}
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
