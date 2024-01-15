import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import { getPosts } from "../../apis/post";
import usePages from "../../hooks/usePages";
import PostDetails from "./PostDetails";
import PostDetailsSkeleton from "./PostDetailsSkeleton";

function PostList({ userId }) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["posts", { search: userId }],
      queryFn: ({ pageParam = 0 }) =>
        getPosts({ page: pageParam, search: userId }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : undefined;
      },
      refetchInterval: 10000,
    });

  const posts = usePages(data);

  if (isLoading || isError) {
    return <PostDetailsSkeleton />;
  }

  return (
    <InfiniteScroll
      className="flex flex-col gap-3"
      style={{ overflow: "visible" }}
      loader={<PostDetailsSkeleton />}
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
