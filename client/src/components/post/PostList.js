import { useContext, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "./Post";
import { AuthContext } from "../../store/auth-context";

function PostList() {
  const { user } = useContext(AuthContext);

  const query = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) =>
      axios(`http://localhost:5000/posts?page=${pageParam}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      }),
    getNextPageParam: (lastPage, allPages) => {
      const response = lastPage.data;
      const posts = response.data;
      return posts.length ? allPages.length + 1 : undefined;
    },
  });

  const posts = useMemo(() => {
    let result = [];
    if (!query.data) {
      return result;
    }
    for (let page of query.data.pages) {
      result = result.concat(page.data.data);
    }
    return result;
  }, [query.data]);

  if (query.isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <InfiniteScroll
      className="flex flex-col gap-3"
      style={{ overflow: "visible" }}
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
