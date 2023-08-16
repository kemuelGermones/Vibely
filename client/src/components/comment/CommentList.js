import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import { getComments } from "../../api/comment";
import handleError from "../../utils/handleError";
import Comment from "./Comment";
import CommentLoader from "./CommentLoader";
import CommentError from "./CommentError";

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

  if (isLoading) {
    return (
      <div className="h-80 overflow-y-auto">
        <CommentLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-80 overflow-y-auto">
        <CommentError />
      </div>
    );
  }

  return (
    <div id="comments" className="h-80 overflow-y-auto">
      <InfiniteScroll
        className="flex flex-col gap-3"
        scrollableTarget="comments"
        style={{ overflow: "visible" }}
        loader={<CommentLoader />}
        dataLength={comments.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
      >
        {comments.map((comment) => (
          <Comment postId={postId} data={comment} key={comment.id} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default CommentList;
