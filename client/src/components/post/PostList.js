import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "./Post";
import PostLoader from "./PostLoader";
import PostError from "./PostError";

function PostList({ queryKey, queryFn }) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey,
      queryFn,
      getNextPageParam: (lastPage, allPages) => {
        const response = lastPage.data;
        const posts = response.items;
        return posts.length ? allPages.length : undefined;
      },
    });

  const posts = useMemo(() => {
    let result = [];
    if (data) {
      data.pages.forEach((page) => {
        result = result.concat(page.data.items);
      });
    }
    return result;
  }, [data]);

  if (isLoading) {
    return <PostLoader />;
  }

  if (isError) {
    return <PostError />;
  }

  return (
    <InfiniteScroll
      className="flex flex-col gap-3"
      style={{ overflow: "visible" }}
      loader={<PostLoader />}
      dataLength={posts.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
    >
      {posts.map((post) => (
        <Post data={post} key={post.id} />
      ))}
    </InfiniteScroll>
  );
}

export default PostList;
