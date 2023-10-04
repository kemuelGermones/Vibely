import { Fragment } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/ui/Navbar";
import UserDetails from "../components/user/UserDetails";
import PostList from "../components/post/PostList";
import AdvertisementDetails from "../components/misc/AdvertisementDetails";
import AboutDetails from "../components/misc/AboutDetails";
import RegulationDetails from "../components/misc/RegulationDetails";

function Profile() {
  const { userId } = useParams();

  return (
    <Fragment>
      <Navbar />
      <main className="container mx-auto mt-12 p-3 sm:grid sm:grid-cols-[1fr_1.5fr] sm:gap-3 md:max-w-screen-md">
        <aside className="hidden sm:block sm:flex sm:flex-col sm:gap-3">
          <AdvertisementDetails />
          <AboutDetails />
          <RegulationDetails />
        </aside>
        <section className="flex flex-col gap-3">
          <UserDetails userId={userId} />
          <PostList userId={userId} />
        </section>
      </main>
    </Fragment>
  );
}

export default Profile;