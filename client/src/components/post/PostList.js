import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import { getPosts } from "../../api/post";
import Post from "./Post";
import PostLoader from "./PostLoader";
import PostError from "./PostError";

function PostList({ userId }) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: userId ? ["posts", { user: userId }] : ["posts"],
      queryFn: ({ pageParam = 0 }) => getPosts({ userId, pageParam }),
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
