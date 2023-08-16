import { Fragment } from "react";

import { getPosts } from "../api/post";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/ui/Navbar";
import User from "../components/user/User";
import PostList from "../components/post/PostList";
import Advertisement from "../components/advertisement/Advertisement";
import CreatePost from "../components/post/CreatePost";

function Posts() {
  const { user } = useAuth();

  const handleQueryFn = ({ pageParam = 0 }) => getPosts(pageParam);

  return (
    <Fragment>
      <Navbar />
      <main className="container mx-auto mt-12 p-3 sm:grid sm:grid-cols-[1fr_1.5fr] sm:gap-3 lg:grid-cols-[1fr_1.5fr_1fr]">
        <aside className="hidden sm:block sm:flex sm:flex-col sm:gap-3">
          <User userId={user.uid} />
        </aside>
        <section className="flex flex-col gap-3">
          <CreatePost />
          <PostList queryKey={["posts"]} queryFn={handleQueryFn} />
        </section>
        <aside className="hidden lg:block">
          <Advertisement />
        </aside>
      </main>
    </Fragment>
  );
}

export default Posts;
