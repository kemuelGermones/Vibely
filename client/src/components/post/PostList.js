import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "./Post";
import { getPosts } from "../../api/post";

function PostList() {
  const query = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    getNextPageParam: (lastPage, allPages) => {
      const response = lastPage.data;
      const posts = response.items;
      return posts.length ? allPages.length + 1 : undefined;
    },
  });

  const posts = useMemo(() => {
    let result = [];
    if (query.data) {
      query.data.pages.forEach((page) => {
        result = result.concat(page.data.items);
      });
    }
    return result;
  }, [query]);

  if (query.isLoading) {
    return (
      <div className="flex justify-center p-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-yellow-400 border-t-transparent"></div>
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow">
        <div className="flex flex-col gap-3 rounded-lg p-6">
          <img className="mx-auto h-14 w-14" src="./warning.svg" />
          <h1 className="text-center text-xl text-gray-700">
            Failed to fetch posts
          </h1>
          <p className="text-center text-gray-500">
            There was an error fetching the data
          </p>
        </div>
      </div>
    );
  }

  return (
    <InfiniteScroll
      className="flex flex-col gap-3"
      style={{ overflow: "visible" }}
      loader={
        <div className="flex justify-center p-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-yellow-400 border-t-transparent"></div>
        </div>
      }
      dataLength={posts.length}
      next={() => query.fetchNextPage()}
      hasMore={query.hasNextPage}
    >
      {posts.map((post) => (
        <Post data={post} key={post.id} />
      ))}
    </InfiniteScroll>
  );
}

export default PostList;
