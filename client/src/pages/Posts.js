import { Fragment } from "react";

import useAuth from "../hooks/useAuth";
import Navbar from "../components/navbar/Navbar";
import UserList from "../components/user/UserList";
import UserDetails from "../components/user/UserDetails";
import PostList from "../components/post/PostList";
import Advertisement from "../components/advertisement/Advertisement";
import CreatePost from "../components/post/CreatePost";

function Posts() {
  const { user } = useAuth();

  return (
    <Fragment>
      <Navbar />
      <main className="container mx-auto mt-12 p-3 sm:grid sm:grid-cols-[1fr_1.5fr] sm:gap-3 lg:grid-cols-[1fr_1.5fr_1fr]">
        <aside className="hidden sm:block sm:flex sm:flex-col sm:gap-3">
          <UserDetails id={user.uid} />
          <UserList />
        </aside>
        <section className="flex flex-col gap-3">
          <CreatePost />
          <PostList />
        </section>
        <aside className="hidden lg:block">
          <Advertisement />
        </aside>
      </main>
    </Fragment>
  );
}

export default Posts;
