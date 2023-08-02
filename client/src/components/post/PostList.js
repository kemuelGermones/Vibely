import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";

import { getPosts } from "../../api/post";
import Post from "./Post";

function PostList() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: getPosts,
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

  const loader = (
    <div className="flex justify-center">
      <AiOutlineLoading3Quarters
        className="animate-spin text-yellow-400"
        size="2em"
      />
    </div>
  );

  if (isLoading) {
    return loader;
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-3 rounded-lg bg-white p-9 shadow">
        <img className="mx-auto h-14 w-14" src="./warning.svg" />
        <h1 className="text-center text-xl text-gray-700">
          Failed to fetch posts
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
      style={{ overflow: "visible" }}
      loader={loader}
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
