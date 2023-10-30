import { Fragment } from "react";

import AboutDetails from "../components/misc/AboutDetails";
import AdvertisementDetails from "../components/misc/AdvertisementDetails";
import RegulationDetails from "../components/misc/RegulationDetails";
import CreatePost from "../components/post/CreatePost";
import PostList from "../components/post/PostList";
import Navbar from "../components/ui/Navbar";
import UserDetails from "../components/user/UserDetails";
import useAuth from "../hooks/useAuth";

function Posts() {
  const { user } = useAuth();

  return (
    <Fragment>
      <Navbar />
      <main className="container mx-auto mt-12 p-3 sm:grid sm:grid-cols-[1fr_1.5fr] sm:gap-3 lg:grid-cols-[1fr_1.5fr_1fr]">
        <aside className="hidden sm:block sm:flex sm:flex-col sm:gap-3">
          <UserDetails userId={user.uid} />
          <AboutDetails />
          <RegulationDetails />
        </aside>
        <section className="flex flex-col gap-3">
          <CreatePost />
          <PostList />
        </section>
        <aside className="hidden lg:block">
          <AdvertisementDetails />
        </aside>
      </main>
    </Fragment>
  );
}

export default Posts;
