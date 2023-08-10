import { Fragment } from "react";
import { useParams } from "react-router-dom";

import { getUserPosts } from "../api/user";
import Navbar from "../components/navbar/Navbar";
import UserDetails from "../components/user/UserDetails";
import UserList from "../components/user/UserList";
import Advertisement from "../components/advertisement/Advertisement";
import PostList from "../components/post/PostList";

function UserProfile() {
  const { userId } = useParams();

  const handleQueryFn = ({ pageParam = 0 }) =>
    getUserPosts({ userId, pageParam });

  return (
    <Fragment>
      <Navbar />
      <main className="container mx-auto mt-12 p-3 sm:grid sm:grid-cols-[1fr_1.5fr] sm:gap-3 md:max-w-screen-md">
        <aside className="hidden sm:block sm:flex sm:flex-col sm:gap-3">
          <Advertisement />
          <UserList />
        </aside>
        <section className="flex flex-col gap-3">
          <UserDetails userId={userId} />
          <PostList
            queryKey={["users", userId, "posts"]}
            queryFn={handleQueryFn}
          />
        </section>
      </main>
    </Fragment>
  );
}

export default UserProfile;
