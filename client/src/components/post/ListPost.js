import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "./Post";
import LoadPost from "./LoadPost";
import ErrorPost from "./ErrorPost";

function ListPost({ queryKey, queryFn }) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey,
      queryFn,
      getNextPageParam: (lastPage, allPages) => {
        const posts = lastPage.items;
        return posts.length ? allPages.length : undefined;
      },
    });

  const posts = useMemo(() => {
    let result = [];
    if (data) {
      data.pages.forEach((page) => {
        result = result.concat(page.items);
      });
    }
    return result;
  }, [data]);

  if (isLoading) {
    return <LoadPost />;
  }

  if (isError) {
    return <ErrorPost />;
  }

  return (
    <InfiniteScroll
      className="flex flex-col gap-3"
      style={{ overflow: "visible" }}
      loader={<LoadPost />}
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

export default ListPost;
