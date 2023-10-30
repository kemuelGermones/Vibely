import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import { getComments } from "../../apis/comment";
import usePages from "../../hooks/usePages";
import CommentDetails from "./CommentDetails";
import CommentDetailsSkeleton from "./CommentDetailsSkeleton";

function CommentList({ postId }) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["posts", postId, "comments"],
      queryFn: ({ pageParam = 0 }) => getComments({ postId, page: pageParam }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
    });

  const comments = usePages(data);

  if (isLoading || isError) {
    return <CommentDetailsSkeleton />;
  }

  return (
    <InfiniteScroll
      className="flex flex-col gap-3"
      scrollableTarget="commentList"
      style={{ overflow: "visible" }}
      loader={<CommentDetailsSkeleton />}
      dataLength={comments.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
    >
      {comments.map((comment) => (
        <CommentDetails postId={postId} data={comment} key={comment.id} />
      ))}
    </InfiniteScroll>
  );
}

export default CommentList;
