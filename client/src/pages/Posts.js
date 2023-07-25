import Navbar from "../components/navbar/Navbar";
import UserList from "../components/user/UserList";
import User from "../components/user/User";
import PostList from "../components/post/PostList";
import Advertisement from "../components/advertisement/Advertisement";
import CreatePost from "../components/post/CreatePost";

function Posts() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto mt-12 p-3 sm:grid sm:grid-cols-[1fr_1.5fr] sm:gap-3 lg:grid-cols-[1fr_1.5fr_1fr]">
        <aside className="hidden sm:block sm:flex sm:flex-col sm:gap-3">
          <User />
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
    </>
  );
}

export default Posts;
