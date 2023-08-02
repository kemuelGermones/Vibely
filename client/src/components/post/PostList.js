import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BsExclamationTriangle } from "react-icons/bs";
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

  if (isLoading) {
    return (
      <div className="rounded-lg bg-white p-3 shadow">
        <div className="flex h-80 flex-col justify-center gap-3">
          <AiOutlineLoading3Quarters
            className="mx-auto animate-spin text-yellow-400"
            size="2.5em"
          />
          <h1 className="text-center text-xl text-gray-700">Loading...</h1>
          <p className="text-center text-gray-500">
            Fetching posts from this app.
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-white p-3 shadow">
        <div className="flex h-80 flex-col justify-center gap-3">
          <BsExclamationTriangle
            className="mx-auto text-red-500"
            size="2.5em"
          />
          <h1 className="text-center text-xl text-gray-700">
            Failed to fetch posts
          </h1>
          <p className="text-center text-gray-500">
            There was an error fetching the data.
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
        <AiOutlineLoading3Quarters
          className="mx-auto animate-spin text-yellow-400"
          size="2.5em"
        />
      }
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
