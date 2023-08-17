import { Fragment } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/ui/Navbar";
import User from "../components/user/User";
import Advertisement from "../components/advertisement/Advertisement";
import PostList from "../components/post/PostList";

function UserProfile() {
  const { userId } = useParams();

  return (
    <Fragment>
      <Navbar />
      <main className="container mx-auto mt-12 p-3 sm:grid sm:grid-cols-[1fr_1.5fr] sm:gap-3 md:max-w-screen-md">
        <aside className="hidden sm:block sm:flex sm:flex-col sm:gap-3">
          <Advertisement />
        </aside>
        <section className="flex flex-col gap-3">
          <User userId={userId} />
          <PostList userId={userId} />
        </section>
      </main>
    </Fragment>
  );
}

export default UserProfile;
